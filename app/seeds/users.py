from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        full_name='Demo User', username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        full_name='Marnie Marnson', username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        full_name='Bobby Brackins', username='bobbie', email='bobbie@aa.io', password='password')
    black_mamba = User(
        full_name='Kobe Bryant', username='black_mamba', email='rip_kobe@gmail.com', password='password'
    )
    jordan_the_goat = User(
        full_name='Michael Jordan', username='jordan_the_goat', email='michaeljordan@gmail.com', password='password'
    )
    lebrons_hairline = User(
        full_name='Lebron James', username='lebrons_hairline', email='lb_james@gmail.com', password='password'
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(black_mamba)
    db.session.add(jordan_the_goat)
    db.session.add(lebrons_hairline)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
