from app.models import db, Comment


def seed_comments():
    comment_1 = Comment(
        user_id=1, game_id=1, comment='Lets get it boys and girls. Gonna b a fun day. Gimme a call if you have any questions or have trouble finding us. (281) 330-8004. See yall on the court!'
    )
    comment_2 = Comment(
        user_id=2, game_id=1, comment='Sounds like fun, Im in! Thanks for setting this up OP'
    )
    comment_3 = Comment(
        user_id=3, game_id=1, comment='Ill b there. I heard losers are buying winners drinks at the bar after!!!'
    )

    db.session.add(comment_1)
    db.session.add(comment_2)
    db.session.add(comment_3)

    db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE')
    db.session.commit()