from flask import Blueprint
from flask_login import login_required
from app.models import Room

room_routes = Blueprint('rooms', __name__)


@room_routes.route('/')
def get_rooms():
    rooms = Room.query.all()

    return {'rooms': [room.to_dict() for room in rooms]}
