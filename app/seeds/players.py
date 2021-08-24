from app.models import db, Player


def seed_players():
    player_1 = Player(
        player_id=1, game_id=1
    )
    player_2 = Player(
        player_id=2, game_id=1
    )
    player_3 = Player(
        player_id=3, game_id=1
    )
    player_4 = Player(
        player_id=4, game_id=1
    )
    player_5 = Player(
        player_id=2, game_id=2
    )
    player_6 = Player(
        player_id=1, game_id=2
    )
    player_7 = Player(
        player_id=3, game_id=2
    )
    player_8 = Player(
        player_id=5, game_id=2
    )
    player_9 = Player(
        player_id=3, game_id=3
    )
    player_10 = Player(
        player_id=1, game_id=3
    )
    player_11 = Player(
        player_id=4, game_id=4
    )
    player_12 = Player(
        player_id=5, game_id=4
    )
    player_13 = Player(
        player_id=1, game_id=4
    )
    player_14 = Player(
        player_id=5, game_id=5
    )
    player_15 = Player(
        player_id=2, game_id=5
    )

    db.session.add(player_1)
    db.session.add(player_2)
    db.session.add(player_3)
    db.session.add(player_4)
    db.session.add(player_5)
    db.session.add(player_6)
    db.session.add(player_7)
    db.session.add(player_8)
    db.session.add(player_9)
    db.session.add(player_10)
    db.session.add(player_11)
    db.session.add(player_12)
    db.session.add(player_13)
    db.session.add(player_14)
    db.session.add(player_15)

    db.session.commit()


def undo_players():
    db.session.execute('TRUNCATE players RESTART IDENTITY CASCADE;')
    db.session.commit()

