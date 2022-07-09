from app.models import db, Room

def seed_rooms():
    room1 = Room(name='hang-zone')
    room2 = Room(name='greenies-chat')


    db.session.add(room1)
    db.session.add(room2)

    db.session.commit()

def undo_rooms():
    db.session.execute('TRUNCATE rooms RESTART IDENTITY CASCADE;')
    db.session.commit()
