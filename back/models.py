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


Slot.ensure_indexes()
Booking.ensure_indexes()
