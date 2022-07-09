from flask import Blueprint
from flask_login import login_required
from app.models import Room

room_routes = Blueprint('rooms', __name__)


@room_routes.route('/')
@login_required
def get_rooms():
    rooms = Room.query.all()

    return {'rooms': [room.to_dict() for room in rooms]}, 200


@room_routes.route('/<int:room_id>/messages')
@login_required
def get_room_massages(room_id):
    room = Room.query.get(room_id)
    # print('😻', [message.to_dict() for message in room.messages])

    if not room:
        return {'error': 'No messages found'}, 400

    return {'messages': [message.to_dict() for message in room.messages]}, 200
