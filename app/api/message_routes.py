from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import Message, db
from app.forms.message_form import MessageForm

message_routes = Blueprint('messages', __name__)

@message_routes.route('/', methods=['POST'])
def create_message():
    form = MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    user_id = current_user.get_id()

    if form.validate_on_submit():
        message = Message(
            room_id =form['room_id'].data,
            user_id = user_id,
            text = form['text'].data
        )
        db.session.add(message)
        db.session.commit()
        return {'message': message.to_dict()}, 200

    return {'error': 'Could not create message'}, 400
