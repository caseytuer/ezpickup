from datetime import datetime
from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, DateTimeField, SelectField, FloatField, validators
from wtforms.validators import DataRequired, ValidationError


def validate_enddate(form, field):
    if field.data < form.start_time.data:
        raise ValidationError('cannot be earlier than Start Time')

def validate_date_in_future(form, field):
    if field.data < datetime.today():
        raise ValidationError('must be in the future')


class GameForm(FlaskForm):
    creator_id = IntegerField('creator_id', validators=[DataRequired()])
    title = StringField('title', [validators.length(min=1, max=20, message='must be less than 20 characters')])
    sport = StringField('sport',validators=[validators.length(min=1, max=20, message='must be less than 20 characters')])
    description = StringField('description', validators=[validators.length(min=1, max=280, message='must be less than 280 characters')])
    equipment_needed = StringField('equipment_needed', validators=[validators.length(min=1, max=20, message='must be less than 20 characters')])
    skill_level = SelectField(u'skill_level', choices=[(1, 'beginner'), (2, 'intermediate'), (3, 'advanced'), (4, 'all levels welcome')])
    address = StringField('address', validators=[validators.length(min=1, max=25, message='must be less than 25 characters')])
    city = StringField('city', validators=[validators.length(min=1, max=25, message='must be less than 25 characters')])
    state = StringField('state', validators=[validators.length(min=1, max=25, message='must be less than 25 characters')])
    country = StringField('country', validators=[validators.length(min=1, max=25, message='must be less than 25 characters')])
    lat = FloatField('lat', validators=[DataRequired()])
    lng = FloatField('lng', validators=[DataRequired()])
    start_time = DateTimeField('start_time', validators=[DataRequired('must be a valid date/time'), validate_date_in_future])
    end_time = DateTimeField('end_time', validators=[DataRequired('must be a valid date/time'), validate_enddate, validate_date_in_future])