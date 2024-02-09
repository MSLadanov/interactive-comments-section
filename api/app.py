import os
from flask import Flask, request
from flask_cors import CORS, cross_origin
import firebase_admin
from firebase_admin import db
from dotenv import load_dotenv

load_dotenv()

credentials_Certificate = os.getenv("credentials_Certificate")
databaseURL = os.getenv("databaseURL")

cred_obj = firebase_admin.credentials.Certificate(credentials_Certificate)
default_app = firebase_admin.initialize_app(cred_obj, {
	'databaseURL': databaseURL
})

ref = db.reference("/")

app = Flask(__name__)
CORS(app)

@app.route("/api/v1/comments", methods=['GET'])
def get_comments():
    data = ref.get()
    return data['comments']

@app.route("/api/v1/comment", methods=['POST'])
def add_comment():
    comment_ref = ref.child('comments')
    req = request.json
    data = ref.get()['comments']
    data.append(req)
    comment_ref.set(data)
    data = ref.get()['comments']
    return data

@app.route("/api/v1/reply", methods=['POST'])
def add_reply():
    comment_ref = ref.child('comments')
    req = request.json
    data = ref.get()['comments']
    comment_index = next((index for (index, d) in enumerate(data) if d["id"] == req['replyingPostId']), None)
    key_to_check = 'replies'
    if data[comment_index].get(key_to_check) is not None:
        print(f"Key '{key_to_check}' exists.")
        data[comment_index]['replies'].append(req)
    else:
        print(f"Key '{key_to_check}' does not exist.")
        data[comment_index].update({'replies':[]}) 
        data[comment_index]['replies'].append(req)
    comment_ref.set(data)
    data = ref.get()['comments']
    return data

@app.route("/api/v1/comment", methods=['DELETE'])
def remove_comment():
    comment_ref = ref.child('comments')
    data = ref.get()['comments']
    key_to_check = 'replyingPostId'
    req = request.json
    res_array = []
    if req.get(key_to_check) is not None:
        res_array = data
        comment_index = next((index for (index, d) in enumerate(data) if d["id"] == req['replyingPostId']), None)
        replies_array = [i for i in data[comment_index]['replies'] if not (i['id'] == req['id'])]
        res_array[comment_index]['replies'] = replies_array
        comment_ref.set(res_array)
    else:
        res_array = [i for i in data if not (i['id'] == req['id'])]
        comment_ref.set(res_array)
    data = ref.get()['comments']
    return data

@app.route("/api/v1/comment", methods=['PATCH'])
def edit_comment():
    comment_ref = ref.child('comments')
    data = ref.get()['comments']
    key_to_check = 'replyingPostId'
    req = request.json
    if req.get(key_to_check) is not None:
        res_array = data
        comment_index = next((index for (index, d) in enumerate(data) if d["id"] == req['replyingPostId']), None)
        reply_array = data[comment_index]['replies']
        reply_index = next((index for (index, d) in enumerate(reply_array) if d["id"] == req['id']), None)
        reply_array[reply_index]['content'] = req['content']
        reply_array[reply_index]['editedAt'] = req['editedAt']
        res_array[comment_index]['replies'] = reply_array
        comment_ref.set(res_array)
        data = ref.get()['comments']
        return data
    else:
        comment_index = next((index for (index, d) in enumerate(data) if d["id"] == req['id']), None)
        comments = data
        comments[comment_index]['content'] = req['content']
        comments[comment_index]['editedAt'] = req['editedAt']
        comment_ref.set(comments)
        data = ref.get()['comments']
        return data

@app.route("/api/v1/user", methods=['GET'])
def get_user():
    data = ref.get()
    return data['currentUser']