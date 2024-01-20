import os
from flask import Flask
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

# print(os.path.abspath("ravely-71918-firebase-adminsdk-o02km-43469056c9.json"))

app = Flask(__name__)
CORS(app)

# print(ref.get())

@app.route("/api/v1/comments", methods=['GET'])
def get_comments():
    data = ref.get()
    return data['comments']

@app.route("/api/v1/user", methods=['GET'])
def get_user():
    data = ref.get()
    return data['currentUser']