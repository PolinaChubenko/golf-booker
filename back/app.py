import os

import flask_praetorian
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from models import User

load_dotenv()

app = Flask(__name__)
guard = flask_praetorian.Praetorian()
cors = CORS(app, resources={r"/*": {"origins": "*"}})

app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SECRET_KEY'] = os.environ["FLASK_SECRET_KEY"]
app.config["JWT_ACCESS_LIFESPAN"] = {"hours": 24}
app.config["JWT_REFRESH_LIFESPAN"] = {"days": 30}

guard.init_app(app, User)
