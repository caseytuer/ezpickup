from flask import Blueprint
from app.models import Player, Game, db
from flask_login import current_user, login_required


players_routes = Blueprint('players', __name__)


@players_routes.route('/games/<int:id>')
def get_players_by_game_id(id):
    players = Player.query.filter_by(game_id=id).all()
    return {'players': [player.to_dict() for player in players]}


@players_routes.route('/games/<int:id>', methods=['POST'])
@login_required
def create_player(id):
    Game.query.get(id)
    players = Player.query.filter(Player.player_id == current_user.id, Player.game_id == id).all()
    if len(players):
        return {'errors': ['Already Joined']}, 409
    else:
        player = Player(
            game_id=id,
            player_id=current_user.id
        )
        db.session.add(player)
        db.session.commit()

    return {"player": {"game_id": id, "player_id": current_user.id}}


@players_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_player(id):
    player = Player.query.get(id)
    db.session.delete(player)
    db.session.commit()

    return {"player": player.to_dict()}