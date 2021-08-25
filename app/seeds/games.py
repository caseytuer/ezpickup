from app.models import db, Game
from datetime import datetime


def seed_games():
    game_1 = Game(
        creator_id='1', title='4 on 4 Outdoor Hoops', sport='Basketball', description='Im trying to have this be a regular game. 4 on 4, the more the merrier cause we have 6 courts that are almost always open and we can rotate w/ subs if need be. Bring your A game', equipment_needed='Basketball Shoes', skill_level='3', address='3585 Governor Dr', city='San Diego', state='CA', country='USA', lat='32.851654506454985', lng='-117.21027709999998', start_time=datetime(2021, 8, 24, 12), end_time=datetime(2021, 8, 24, 16)
    )
    game_2 = Game(
        creator_id='2', title='Beach Soccer', sport='Soccer', description='Soccer on the beach! Come on down to Pacific Beach right near the pier and join us in a friendly game of soccer. All skill levels encouraged. Will be a nice sunny day and where better to be than the beach??', equipment_needed='none', skill_level='4', address='4500 Ocean Blvd', city='San Diego', state='CA', country='USA', lat='32.796535539600676', lng='-117.2568403607182', start_time=datetime(2021, 8, 24, 8), end_time=datetime(2021, 8, 24, 12)
    )
    game_3 = Game(
        creator_id='3', title='Bayside Bball', sport='Basketball', description='Come shoot hoops by the San Diego Bay on Saturday afternoon. If you havent been before, the courts are right on by sand @ Crown Point. Come through any time Ill be there all afternoon. We usually run 2 on 2 but if more peeps show up we can run 3s or 4s.', equipment_needed='Shoes', skill_level='2', address='Crown Point Dr', city='San Diego', state='CA', country='USA', lat='32.78774651335261', lng='-117.23338505888941', start_time=datetime(2021, 8, 27, 12), end_time=datetime(2021, 8, 27, 18)
    )
    game_4 = Game(
        creator_id='4', title='Tennis in Point Loma', sport='Tennis', description='I have access to the Point Loma Tennis Club all afternoon. Come by and we can play! 4 courts open, first come first serve. We can do 1s or 2s depending on who shows. Usually costs money to reserve these courts so come enjoy the free games while you can!', equipment_needed='Racket', skill_level='4', address='2650 Worden St', city='San Diego', state='CA', country='USA', lat='32.74859550434696', lng='-117.22752563005508', start_time=datetime(2021, 8, 28, 12), end_time=datetime(2021, 8, 28, 18)
    )
    game_5 = Game(
        creator_id='5', title='Over The Line @ Fiesta Island', sport='OTL (Over The Line)', description='Hosting a mini OTL tourney at Fiesta Island Sunday Morning for prizes and glory. I have court lines and balls, but yall will need to BYOB (bring your own bats 😉) Please reserve a spot before Sunday so that I know how many courts to set up. See you Sunday', equipment_needed='OTL Bat', skill_level='2', address='1590 E Mission Bay Dr', city='San Diego', state='CA', country='USA', lat='32.77155170832836', lng='-117.21593085378987', start_time=datetime(2021, 8, 28, 6), end_time=datetime(2021, 8, 28, 12)
    )

    db.session.add(game_1)
    db.session.add(game_2)
    db.session.add(game_3)
    db.session.add(game_4)
    db.session.add(game_5)

    db.session.commit()


def undo_games():
    db.session.execute('TRUNCATE games RESTART IDENTITY CASCADE;')
    db.session.commit()
