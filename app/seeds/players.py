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
        player_id=5, game_id=1
    )
    player_6 = Player(
        player_id=6, game_id=1
    )
    player_7 = Player(
        player_id=7, game_id=1
    )
    player_8 = Player(
        player_id=6, game_id=2
    )
    player_9 = Player(
        player_id=2, game_id=2
    )
    player_10 = Player(
        player_id=3, game_id=2
    )
    player_11 = Player(
        player_id=4, game_id=2
    )
    player_12 = Player(
        player_id=5, game_id=2
    )
    player_13 = Player(
        player_id=1, game_id=3
    )
    player_14 = Player(
        player_id=2, game_id=3
    )
    player_15 = Player(
        player_id=3, game_id=3
    )
    player_16 = Player(
        player_id=4, game_id=3
    )
    player_17 = Player(
        player_id=5, game_id=3
    )
    player_18 = Player(
        player_id=6, game_id=3
    )
    player_19 = Player(
        player_id=1, game_id=4
    )
    player_20 = Player(
        player_id=2, game_id=4
    )
    player_21 = Player(
        player_id=3, game_id=4
    )
    player_22 = Player(
        player_id=4, game_id=4
    )
    player_23 = Player(
        player_id=2, game_id=5
    )
    player_24 = Player(
        player_id=3, game_id=5
    )
    player_25 = Player(
        player_id=4, game_id=5
    )
    player_26 = Player(
        player_id=5, game_id=5
    )
    player_27 = Player(
        player_id=1, game_id=6
    )
    player_28 = Player(
        player_id=3, game_id=6
    )
    player_29 = Player(
        player_id=5, game_id=5
    )
    player_30 = Player(
        player_id=6, game_id=6
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

