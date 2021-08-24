from .db import db


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.now())

    user_relation = db.relationship('User', back_populates='comment_relation')
    game_relation = db.relationship('Game', back_populates='comment_relation')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'game_id': self.game_id,
            'created_at': self.created_at,
        }
