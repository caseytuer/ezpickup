from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, DateTimeField, SelectField, FloatField
from wtforms.validators import DataRequired


class GameForm(FlaskForm):
    creator_id = IntegerField('creator_id', validators=[DataRequired()])
    title = StringField('title', validators=[DataRequired()])
    sport = StringField('sport', validators=[DataRequired()])
    description = StringField('description')
    equipment_needed = StringField('equipment_needed')
    skill_level = SelectField(u'skill_level', choices=[(1, 'beginner'), (2, 'intermediate'), (3, 'advanced'), (4, 'all levels welcome')])
    address = StringField('address', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    country = StringField('country', validators=[DataRequired()])
    lat = FloatField('lat', validators=[DataRequired()])
    lng = FloatField('lng', validators=[DataRequired()])
    start_time = DateTimeField('start_time', validators=[DataRequired()])
    end_time = DateTimeField('end_time', validators=[DataRequired()])