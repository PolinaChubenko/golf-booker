import json

import flask_praetorian
from dateutil import parser
from flask import request

from app import app, guard
from models import Slot, Booking


@app.route("/api/slot", methods=["GET", "POST"])
@flask_praetorian.auth_required
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
            "success": True,
            "result": {
                "time": str(slot.time),
                "comment": slot.comment,
                "bookings": [
                    {
                        "name": booking.name,
                        "surname": booking.surname,
                        "phone": booking.phone,
                        "email": booking.email,
                        "hcp": booking.hcp,
                        "member": booking.member
                    }
                    for booking in bookings
                ]
            }
        }
        return json.dumps(response)
    else:  # request.methods == "POST":
        data = request.get_json()
        bookings = data["bookings"]
        slot = Slot.find_one({"time": parser.parse(data["slot"])})
        if len(bookings) != 0 and slot is not None:
            slot.comment = data["comment"]
            slot.commit()
        if len(bookings) != 0 and slot is None:
            slot = Slot(time=data["slot"], comment=data["comment"])
            slot.commit()
        old_bookings = list(Booking.find({"slot": slot}))
        for b in old_bookings:
            b.delete()
        for b in bookings:
            try:
                hcp = float(b["hcp"])
            except:
                hcp = None
            booking = Booking(
                slot=slot,
                name=b["name"],
                surname=b["surname"],
                phone=b["phone"],
                email=b["email"],
                hcp=float(b["hcp"]),
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
    return json.dumps({
        "success": True,
        "result": response
    })


@app.route("/api/token", methods=["POST"])
def token():
    req = request.get_json(force=True)
    username = req.get('username', "default")
    password = req.get('password', None)
    user = guard.authenticate(username, password)
    token = guard.encode_jwt_token(user)
    ret = {"access": token, "refresh": token}
    return ret, 200


@app.route("/api/token/refresh", methods=["POST"])
def refresh():
    print("refresh request")
    old_token = request.get_json().get("refresh", None)
    new_token = guard.refresh_jwt_token(old_token)
    ret = {"access": new_token}
    return ret, 200
