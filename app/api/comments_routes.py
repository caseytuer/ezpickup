from flask import Blueprint, request
from app.models import Comment, db
from app.forms import CommentForm


comments_routes = Blueprint('/comments', __name__)


def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            words = field.split('_')
            capwords = []
            for w in words:
                capwords.append(w.capitalize())
            string = (' ').join(capwords)
            errorMessages.append(f'{string} : {error}')
    return errorMessages


@comments_routes.route('/', methods=['GET'])
def get_all_comments():
    all_comments = Comment.query.all()
    return {'comments': [comment.to_dict() for comment in all_comments]}


@comments_routes.route('/games/<int:id>', methods=['GET'])
def get_comments_by_game_id(id):
    comments = Comment.query.filter_by(game_id=id).all()
    return {'comments': [comment.to_dict() for comment in comments]}


@comments_routes.route('/games/<int:id>', methods=['POST'])
def create_comment(id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(
            comment=form.comment.data,
            user_id=form.user_id.data,
            game_id=form.game_id.data
        )
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@comments_routes.route('/<int:id>', methods=['PUT'])
def update_comment(id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment.query.get(id)
        comment.user_id = form.user_id.data
        comment.game_id = form.game_id.data
        comment.comment = form.comment.data
        db.session.commit()
        return comment.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@comments_routes.route('/<int:id>', methods=['DELETE'])
def delete_comment(id):
    comment = Comment.query.get(id)
    if comment:
        db.session.delete(comment)
        db.session.commit()
        return {'message': 'comment deleted'}
    else:
        return {'message': 'something went wrong'}, 404