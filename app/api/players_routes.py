from flask import Blueprint
from app.models import Player, db


players_routes = Blueprint('players', __name__)


@players_routes.route('/games/<int:id>')
def get_players_by_game_id(id):
    players = Player.query.filter_by(game_id=id).all()
    return {'players': [player.to_dict() for player in players]}