import './Player.scss';
import React from 'react';
import PropTypes from 'prop-types';
import playerShape from '../../helpers/propz/playerShape';

class Player extends React.Component {
  static propTypes = {
    player: playerShape.playerShape,
    sack: PropTypes.func,
    changeEditMode: PropTypes.func,
    setPlayerToEdit: PropTypes.func,
  }

  deletePlayerEvent = (e) => {
    e.preventDefault();
    const { sack, player } = this.props;
    sack(player.id);
  }

  setEditMode = (e) => {
    e.preventDefault();
    const { changeEditMode, setPlayerToEdit, player } = this.props;
    changeEditMode(true);
    setPlayerToEdit(player);
  }

  render() {
    const { player } = this.props;

    return (
      <div className="card playerCard col-3 m-2">
        <img src={player.imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{player.name}</h5>
          <p className="card-text">{player.position}</p>
          <button className="btn btn-dark" onClick={this.deletePlayerEvent}>Remove</button>
          <button className="btn btn-secondary" onClick={this.setEditMode}>Edit</button>
        </div>
      </div>
    );
  }
}

export default Player;
