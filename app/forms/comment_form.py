from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired


class CommentForm(FlaskForm):
    comment = StringField(validators=[DataRequired()])
    game_id = IntegerField(validators=[DataRequired()])
    user_id = IntegerField(validators=[DataRequired()])