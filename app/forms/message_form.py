from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import Message

class MessageForm(FlaskForm):
    room_id = IntegerField('room_id', validators=[
        DataRequired('Room ID is required')
    ])
    text = StringField('text', validators=[
        DataRequired('Message most contain content')
    ])
