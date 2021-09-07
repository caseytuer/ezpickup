from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        full_name='Demo User', username='DemoUser1', email='demo@aa.io', password='password', profile_image='https://randomuser.me/api/portraits/men/54.jpg')
    marnie = User(
        full_name='Marnie Marnson', username='Marnie2TheMax', email='marnie@aa.io', password='password', profile_image='https://randomuser.me/api/portraits/women/44.jpg')
    bobbie = User(
        full_name='Bobby Brackins', username='bobbieBALLER', email='bobbie@aa.io', password='password', profile_image='https://randomuser.me/api/portraits/men/66.jpg')
    black_mamba = User(
        full_name='Kobe Bryant', username='black_mamba', email='rip_kobe@gmail.com', password='password', profile_image='https://randomuser.me/api/portraits/men/90.jpg'
    )
    jordan_the_goat = User(
        full_name='Michael Jordan', username='jordan_the_goat', email='michaeljordan@gmail.com', password='password', profile_image='https://randomuser.me/api/portraits/men/80.jpg'
    )
    lebrons_hairline = User(
        full_name='Lebron James', username='LibraLivin', email='lb_james@gmail.com', password='password', profile_image='https://randomuser.me/api/portraits/men/34.jpg'
    )
    dennis = User(
        full_name='Dennis Reynolds', username='5StarMan', email='dennis@gmail.com', password='password', profile_image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpON7kMgv2iswG7t23eCbr0pgtV1kyOQHpAA&usqp=CAU'
    )
    mac = User(
        full_name='Ronald MacDonald', username='SherrifMac', email='mac@paddys.pub', password='password', profile_image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbFNGD9dYaxWWLEJ3f4Rnp8c0eVkJhvI4DTA&usqp=CAU'
    )
    frank = User(
        full_name='Frank Reynolds', username='TheWarthog', email='frank@gmail.com', password='password', profile_image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc64JAkiHtWyDCxYputJL16ZjfiEXumJDucg&usqp=CAU'
    )
    charley = User(
        full_name='Charley Kelly', username='RatSlayer29', email='charley@gmail.com', password='password', profile_image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMVbbu5A3AEENxRHTL6w6qloc7cfmQuUNNcQ&usqp=CAU'
    )
    dee = User(
        full_name='Dee Reynolds', username='SweetDee', email='dee@gmail.com', password='password', profile_image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwV62LguI4CfDAy0Xt2eBUeFWZNKEJ_J-uew&usqp=CAU'
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(black_mamba)
    db.session.add(jordan_the_goat)
    db.session.add(lebrons_hairline)
    db.session.add(dennis)
    db.session.add(mac)
    db.session.add(frank)
    db.session.add(charley)
    db.session.add(dee)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
