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
    message3 = Message(
        room_id=2,
        user_id=1,
        text='hey what do you guys think about greenies?'
    )
    message4 = Message(
        room_id=2,
        user_id=2,
        text='they slap, no cap'
    )

    db.session.add(message1)
    db.session.add(message2)
    db.session.add(message3)
    db.session.add(message4)

    db.session.commit()

def undo_messages():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.commit()
