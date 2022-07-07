from app.models import db, Message

def seed_messages():
    message1 = Message(
        room_id=1,
        user_id=1,
        text='first message lol'
    )

    message2 = Message(
        room_id=1,
        user_id=2,
        text='second message lolllz'
    )

    db.session.add(message1)
    db.session.add(message2)

    db.session.commit()

def undo_messages():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.commit()
