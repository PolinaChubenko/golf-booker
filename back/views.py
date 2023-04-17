import json
from dateutil import parser

from flask import request
from flask_cors import cross_origin

from app import app
from models import Slot, Booking


@app.route("/api/slot", methods=["GET"])
def api_slot():
    if request.method == "GET":
        if "slot" not in request.args:
            return json.dumps({
                "success": False,
                "reason": "'slot' property is not specified"
            })
        slot = Slot.find_one({"time": parser.parse(request.args["slot"])})
        if slot is None:
            return json.dumps({
                "success": False,
                "reason": "No such slot"
            })
        bookings = list(Booking.find({"slot": slot}))
        response = {
            "time": str(slot.time),
            "comment": slot.comment,
            "bookings": [
                {
                    "name": booking.name,
                    "surname": booking.surname,
                    "phone": booking.phone,
                    "email": booking.email,
                    "member": booking.member
                }
                for booking in bookings
            ]
        }
        return json.dumps(response)
    else:  # request.methods == "POST":
        data = request.get_json()
        bookings = data["bookings"]
        slot = Slot.find_one({"time": parser.parse(data["slot"])})
        if len(bookings) != 0 and slot is None:
            slot = Slot(time=data["slot"], comment=data["comment"])
            slot.commit()
        old_bookings = list(Booking.find({"slot": slot}))
        for b in old_bookings:
            b.delete()
        for b in bookings:
            booking = Booking(
                slot=slot,
                name=b["name"],
                surname=b["surname"],
                phone=b["phone"],
                email=b["email"],
                member=b["member"]
            )
            booking.commit()
        if len(bookings) == 0 and slot is not None:
            slot.delete()
        return json.dumps({
            "success": True
        })


@app.route("/api/slot/list", methods=["GET"])
def api_slot_list():
    if "start" not in request.args or "end" not in request.args:
        return json.dumps({
            "success": False,
            "reason": "'start' or 'end' property is not specified"
        })
    start = parser.parse(request.args["start"])
    end = parser.parse(request.args["end"])
    slots = Slot.find({
        "time": {
            "$gte": start,
            "$lte": end
        }
    })
    response = []
    for slot in slots:
        bookings = list(Booking.find({"slot": slot}))
        response.append({
            "slot": str(slot.time),
            "participants": len(bookings),
            "bookings": {
                "member": booking.member
                for booking in bookings
            }
        })
    return json.dumps(response)
