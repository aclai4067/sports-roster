import './Form.scss';
import React from 'react';
import PropTypes from 'prop-types';
import authData from '../../helpers/data/authData';

class Form extends React.Component {
  static propTypes = {
    addNewPlayer: PropTypes.func,
  }

  state = {
    playerName: '',
    playerImgUrl: '',
    playerPosition: '',
  }

  savePlayerEvent = (e) => {
    e.preventDefault();
    const saveNewPlayer = this.props.addNewPlayer;
    const newPlayerObj = {
      name: this.state.playerName,
      imageUrl: this.state.playerImgUrl,
      position: this.state.playerPosition,
      uid: authData.getUid(),
    };
    saveNewPlayer(newPlayerObj);
    this.setState({ playerName: '', playerImgUrl: '', playerPosition: '' });
  }

  addName = (e) => {
    e.preventDefault();
    this.setState({ playerName: e.target.value });
  }

  addImgUrl = (e) => {
    e.preventDefault();
    this.setState({ playerImgUrl: e.target.value });
  }

  addPosition = (e) => {
    e.preventDefault();
    this.setState({ playerPosition: e.target.value });
  }

  render() {
    return (
      <form className='col-6 offset-3 PinForm'>
        <div className="form-group">
          <label htmlFor="player-name">Player Name:</label>
          <input type="text" className="form-control" id="player-name" placeholder="Mia Hamm" value={this.state.playerName} onChange={this.addName} />
        </div>
        <div className="form-group">
          <label htmlFor="player-image-url">Player Image Url:</label>
          <input type="text" className="form-control" id="player-image-url" placeholder="https://www.google.com" value={this.state.playerImgUrl} onChange={this.addImgUrl} />
        </div>
        <div className="form-group">
          <label htmlFor="player-position">Player Poisition:</label>
          <input type="text" className="form-control" id="player-position" placeholder="Forward" value={this.state.playerPosition} onChange={this.addPosition} />
        </div>
        <button className="btn btn-secondary" onClick={this.savePlayerEvent}>Add Player</button>
      </form>
    );
  }
}

export default Form;
