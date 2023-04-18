from bson import ObjectId
from pymongo import MongoClient
from umongo import Document, fields
from umongo.frameworks import PyMongoInstance

import config

db = MongoClient(config.DB_HOST)[config.DB_NAME]
instance = PyMongoInstance(db)


@instance.register
class Slot(Document):
    time = fields.DateTimeField()
    comment = fields.StringField()


@instance.register
class Booking(Document):
    slot = fields.ReferenceField(Slot)
    name = fields.StringField()
    surname = fields.StringField()
    phone = fields.StringField()
    email = fields.StringField()
    hcp = fields.FloatField()
    member = fields.BooleanField()


@instance.register
class User(Document):
    username = fields.StringField(unique=True)
    hashed_password = fields.StringField()
    roles = fields.StringField(default="")
    is_active = fields.BooleanField(default=True)

    @property
    def identity(self):
        return str(self.id)

    @property
    def rolenames(self):
        try:
            return self.roles.split(",")
        except Exception:
            return []

    @property
    def password(self):
        return self.hashed_password

    @classmethod
    def lookup(cls, username):
        """
        *Required Method*

        flask-praetorian requires that the user class implements a ``lookup()``
        class method that takes a single ``username`` argument and returns a user
        instance if there is one that matches or ``None`` if there is not.
        """
        return cls.find_one({"username": username})

    @classmethod
    def identify(cls, id):
        return cls.find_one({"_id": ObjectId(id)})

    def is_valid(self):
        return self.is_active


Slot.ensure_indexes()
Booking.ensure_indexes()
User.ensure_indexes()
