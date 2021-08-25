from flask import Blueprint, request
from flask_login import login_required
from app.models import Game, db
from app.forms import GameForm



games_routes = Blueprint('games', __name__)

#############################################################

def validation_errors_to_error_messages(validation_errors):
    # helper function to collect and display errors
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


def authorization_errors_to_error_messages(message="unauthorized user"):
    return {'errors': message}, 401


def input_errors_to_error_messages(message="incorrect input"):
    return {'errors': message}, 401

#############################################################

@games_routes.route('/', methods=['GET'])
def get_all_games():
    all_games = Game.query.all()
    return {'games': [game.to_dict() for game in all_games]}


@games_routes.route('/', methods=['POST'])
# @login_required
def create_game():
    form = GameForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data)
    if form.validate_on_submit():
        game = Game(
            creator_id = form.creator_id.data,
            title = form.title.data,
            sport = form.sport.data,
            description = form.description.data,
            equipment_needed = form.equipment_needed.data,
            skill_level = form.skill_level.data,
            address = form.address.data,
            city = form.city.data,
            state = form.state.data,
            country = form.country.data,
            lat = form.lat.data,
            lng = form.lng.data,
            start_time = form.start_time.data,
            end_time = form.end_time.data
        )
        db.session.add(game)
        db.session.commit()
        return game.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@games_routes.route('/<int:id>', methods=['GET'])
def get_single_game(id):
    single_game = Game.query.get(id)
    return single_game.to_dict()




@games_routes.route('/<int:id>', methods=['PUT'])
def edit_game(id):
    form = GameForm()   # need form
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        game = Game.query.get(id)
        game.title = form.game.title
        game.sport = form.game.sport
        game.description = form.game.description
        game.equipment_needed = form.game.equipment_needed
        game.skill_level = form.game.skill_level
        game.address = form.game.address
        game.city = form.game.city
        game.state = form.game.state
        game.country = form.game.country
        game.lat = form.game.lat
        game.lng = form.game.lng
        game.start_time = form.game.start_time
        game.end_time = form.game.end_time
        db.session.commit()
        return game.to_dict()
    else:
        return {'error': 'Something went wrong'}, 404


@games_routes.route('/<int:id>', methods=['DELETE'])
def delete_game(id):
    game = Game.query.get(id)
    if game:
        db.session.delete(game)
        db.session.commit()
        return {'message': 'Game deleted'}
    else:
        return {'message': 'Something went wrong'}, 404

