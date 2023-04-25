import os

HOST = "127.0.0.1"
PORT = 8080
DEBUG = True

DB_HOSTNAME = os.environ.get("MONGODB_HOST", "localhost")
DB_HOST = f"mongodb://{DB_HOSTNAME}:27017/"
DB_NAME = "golfbooker"
