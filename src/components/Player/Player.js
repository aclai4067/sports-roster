import './Player.scss';
import React from 'react';
import playerShape from '../../helpers/propz/playerShape';
import PropTypes from 'prop-types';

class Player extends React.Component {
  static propTypes = {
    player: playerShape.playerShape,
    sack: PropTypes.func,
  }

  deletePlayerEvent = (e) => {
    e.preventDefault();
    const { sack, player } = this.props;
    sack(player.id);
  }

  render() {
    const { player } = this.props;

    return (
      <div className="card col-3 m-2">
        <img src={player.imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{player.name}</h5>
          <p className="card-text">{player.position}</p>
          <button className="btn btn-warning" onClick={this.deletePlayerEvent}>Remove</button>
        </div>
      </div>
    );
  }
}

export default Player;
