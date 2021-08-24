from .db import db


class Player(db.Model):
    __tablename__ = 'players'

    id = db.Column(db.Integer, primary_key=True)
    player_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'), nullable=False)

    user_relation = db.relationship('User', back_populates='player_relation')
    game_relation = db.relationship('Game', back_populates='player_relation')

    def to_dict(self):
        return {
            'id': self.id,
            'player_id': self.player_id,
            'game_id': self.game_id,
        }
