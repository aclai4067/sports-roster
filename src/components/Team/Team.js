import './Team.scss';
import React from 'react';
import PropTypes from 'prop-types';
import playerData from '../../helpers/data/playerData';
import authData from '../../helpers/data/authData';
import Player from '../Player/Player';

class Team extends React.Component {
  static propTypes = {
    changeEditMode: PropTypes.func,
    setPlayerToEdit: PropTypes.func,
  }

  state = {
    players: [],
  }

  getPlayers = () => {
    playerData.getPlayersByUid(authData.getUid())
      .then((players) => {
        this.setState({ players });
      }).catch((err) => console.error(err));
  }

  componentDidMount() {
    this.getPlayers();
  }

  removePlayer = (playerId) => {
    playerData.deletePlayer(playerId)
      .then(() => {
        this.getPlayers();
      }).catch((err) => console.error(err));
  }

  render() {
    const { changeEditMode, setPlayerToEdit } = this.props;

    return (
      <div>
        <h1>My Team</h1>
        <div className="row d-flex flex-wrap justify-content-around">
          {this.state.players.map((player) => <Player key={player.id} player={player} sack={this.removePlayer} changeEditMode={changeEditMode} setPlayerToEdit={setPlayerToEdit} />)}
        </div>
      </div>
    );
  }
}

export default Team;
