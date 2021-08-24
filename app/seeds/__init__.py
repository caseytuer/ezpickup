from flask.cli import AppGroup
from .users import seed_users, undo_users
from .games import seed_games, undo_games
from .players import seed_players, undo_players
from .comments import seed_comments, undo_comments

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_games()
    seed_players()
    seed_comments()

    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_games()
    undo_players()
    undo_comments()
    # Add other undo functions here
