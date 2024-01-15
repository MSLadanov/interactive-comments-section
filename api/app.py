import os
from flask import Flask
from flask_cors import CORS, cross_origin
import firebase_admin
from firebase_admin import db

from dotenv import load_dotenv

load_dotenv()

credentials_Certificate = os.getenv("credentials_Certificate")
databaseURL = os.getenv("databaseURL")

ref = db.reference("/")
cred_obj = firebase_admin.credentials.Certificate(credentials_Certificate)
default_app = firebase_admin.initialize_app(cred_obj, {
	'databaseURL': databaseURL
})

app = Flask(__name__)
CORS(app)

@app.route("/api/v1/")
def hello_world():
    return {
        'message': 'Hello test API!'
    }