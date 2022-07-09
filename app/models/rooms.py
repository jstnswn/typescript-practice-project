from .db import db

class Room(db.Model):
    __tablename__ = 'rooms'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

    messages = db.relationship('Message', back_populates='room')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'message_ids': [message.id for message in self.messages]
        }

    def get_messages(self):
        return {'messages': self.messages}
