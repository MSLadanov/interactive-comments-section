from flask import Flask
from flask_cors import CORS, cross_origin
import firebase_admin

cred_obj = firebase_admin.credentials.Certificate('....path to file')
default_app = firebase_admin.initialize_app(cred_object, {
	'databaseURL':databaseURL
})

app = Flask(__name__)
CORS(app)

@app.route("/api/v1/")
def hello_world():
    return {
        'message': 'Hello test API!'
    }