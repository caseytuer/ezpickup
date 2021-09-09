from .db import db


class Game(db.Model):
    __tablename__ = 'games'

    id = db.Column(db.Integer, primary_key=True)
    creator_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(20), nullable=False)
    sport = db.Column(db.String(20), nullable=False)
    description = db.Column(db.String(280))
    equipment_needed = db.Column(db.String(20))
    skill_level = db.Column(db.Integer)
    address = db.Column(db.String(25), nullable=False)
    city = db.Column(db.String(25), nullable=False)
    state = db.Column(db.String(25), nullable=False)
    country = db.Column(db.String(25), nullable=False)
    lat = db.Column(db.Float, nullable=False)
    lng = db.Column(db.Float, nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.now())

    user_relation = db.relationship('User', back_populates='game_relation')
    player_relation = db.relationship('Player', back_populates='game_relation', cascade='all, delete-orphan')
    comment_relation = db.relationship('Comment', back_populates='game_relation')

    def to_dict(self):
        return {
            'id': self.id,
            'creator_id': self.creator_id,
            'title': self.title,
            'sport': self.sport,
            'description': self.description,
            'equipment_needed': self.equipment_needed,
            'skill_level': self.skill_level,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'country': self.country,
            'lat': self.lat,
            'lng': self.lng,
            'start_time': self.start_time,
            'end_time': self.end_time,
            'created_at': self.created_at,
        }
