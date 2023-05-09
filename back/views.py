import json
from datetime import timedelta

import flask_praetorian
from dateutil import parser
from flask import request
from flask_praetorian.utilities import get_jwt_data_from_app_context

from app import app, guard
from models import Slot, Booking, BlockedRange


@app.route("/slot", methods=["GET", "POST"])
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
                "buggies": slot.buggies,
                "carts": slot.carts,
                "confirmed": slot.confirmed,
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
        try:
            buggies = int(data["buggies"])
        except:
            buggies = None
        try:
            carts = int(data["carts"])
        except:
            carts = None
        if len(bookings) != 0 and slot is not None:
            slot.comment = data["comment"]
            slot.buggies = buggies
            slot.carts = carts
            slot.confirmed = int(data["confirmed"])
            slot.commit()
        if len(bookings) != 0 and slot is None:
            slot = Slot(time=data["slot"], comment=data["comment"], buggies=buggies, carts=carts,
                        confirmed=int(data["confirmed"]))
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
                hcp=hcp,
                member=b["member"]
            )
            booking.commit()
        if len(bookings) == 0 and slot is not None:
            slot.delete()
        return json.dumps({
            "success": True
        })


@app.route("/blocked_range", methods=["POST", "DELETE"])
@flask_praetorian.auth_required
def api_blocked_range():
    data = request.get_json()
    if "start" not in data or "end" not in data:
        return json.dumps({
            "success": False,
            "reason": "'start' or 'end' property is not specified"
        })
    start = parser.parse(data["start"])
    end = parser.parse(data["end"])
    if request.method == "POST":
        blocked_range = BlockedRange(start=start, end=end)
        blocked_range.commit()
        return json.dumps({
            "success": True
        })
    elif request.method == "DELETE":
        blocked_range = BlockedRange.find_one({
            "start": start,
            "end": end
        })
        if blocked_range is None:
            return json.dumps({
                "success": False,
                "reason": "No such blocked range"
            })
        blocked_range.delete()
        return json.dumps({
            "success": True
        })


@app.route("/events", methods=["GET"])
def api_events():
    if "start" not in request.args or "end" not in request.args:
        return json.dumps({
            "success": False,
            "reason": "'start' or 'end' property is not specified"
        })
    start = parser.parse(request.args["start"])
    end = parser.parse(request.args["end"])
    is_day_view = (end - start) <= timedelta(hours=24)
    slots = Slot.find({
        "time": {
            "$gte": start,
            "$lte": end
        }
    })
    slots_response = []
    for slot in slots:
        bookings = list(Booking.find({"slot": slot}))
        if is_day_view:
            slots_response.append({
                "time": str(slot.time),
                "comment": slot.comment,
                "buggies": slot.buggies,
                "carts": slot.carts,
                "confirmed": slot.confirmed,
                "participants": len(bookings),
                "members": sum([int(booking.member) for booking in bookings]),
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
            })
        else:
            slots_response.append({
                "slot": str(slot.time),
                "participants": len(bookings),
                "members": sum([int(booking.member) for booking in bookings]),
                "confirmed": slot.confirmed
            })
    blocked_ranges = BlockedRange.find({
        "$or": [
            {
                "start": {
                    "$gte": start,
                    "$lte": end
                }
            },
            {
                "end": {
                    "$gte": start,
                    "$lte": end
                }
            }
        ]
    })
    blocked_ranges_response = []
    for blocked_range in blocked_ranges:
        blocked_ranges_response.append({
            "start": str(blocked_range.start),
            "end": str(blocked_range.end)
        })
    return json.dumps({
        "success": True,
        "result": {
            "slots": slots_response,
            "blocked_ranges": blocked_ranges_response
        }
    })


@app.route("/token", methods=["POST"])
def token():
    req = request.get_json(force=True)
    username = req.get('username', "default")
    password = req.get('password', None)
    user = guard.authenticate(username, password)
    token = guard.encode_jwt_token(user)
    ret = {"access": token, "refresh": token}
    return ret, 200


@app.route("/token/refresh", methods=["POST"])
def refresh():
    print("refresh request")
    old_token = request.get_json().get("refresh", None)
    new_token = guard.refresh_jwt_token(old_token)
    ret = {"access": new_token}
    return ret, 200
