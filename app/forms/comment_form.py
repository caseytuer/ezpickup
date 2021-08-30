from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired


class CommentForm(FlaskForm):
    comment = StringField('comment', validators=[DataRequired()])
    game_id = IntegerField('game_id', validators=[DataRequired()])
    user_id = IntegerField('user_id', validators=[DataRequired()])