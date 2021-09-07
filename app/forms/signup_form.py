from flask_wtf import FlaskForm
from wtforms import StringField, validators
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    full_name = StringField('Full Name', [validators.Length(min=1, max=50, message='must be less than 50 characters')])
    username = StringField(
        'Username', validators=[validators.length(min=1, max=40, message='must be less than 40 characters'), username_exists])
    email = StringField('Email', validators=[DataRequired(), user_exists])
    password = StringField('Password', validators=[DataRequired()])
    profile_image = StringField('Profile Image')
    # , validators.URL(require_tld=False, message='must be a valid URL'))
