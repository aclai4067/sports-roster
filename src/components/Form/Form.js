import './Form.scss';
import React from 'react';
import PropTypes from 'prop-types';
import authData from '../../helpers/data/authData';
import playerShape from '../../helpers/propz/playerShape';

class Form extends React.Component {
  static propTypes = {
    addNewPlayer: PropTypes.func,
    editMode: PropTypes.bool,
    playerToEdit: playerShape.playerShape,
    editPlayer: PropTypes.func,
  }

  state = {
    playerName: '',
    playerImgUrl: '',
    playerPosition: '',
  }

  componentDidMount() {
    const { playerToEdit, editMode } = this.props;
    if (editMode) {
      this.setState({ playerName: playerToEdit.name, playerImgUrl: playerToEdit.imageUrl, playerPosition: playerToEdit.position });
    }
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

  updatePlayerEvent = (e) => {
    e.preventDefault();
    const { editPlayer, playerToEdit } = this.props;
    const updatedPlayer = {
      name: this.state.playerName,
      imageUrl: this.state.playerImgUrl,
      position: this.state.playerPosition,
      uid: playerToEdit.uid,
    };
    editPlayer(playerToEdit.id, updatedPlayer);
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
    const { editMode } = this.props;

    return (
      <form className='col-6 offset-3 mt-5 playerForm'>
        <div className="form-group">
          <label htmlFor="player-name">Player Name</label>
          <input type="text" className="form-control" id="player-name" placeholder="Mia Hamm" value={this.state.playerName} onChange={this.addName} />
        </div>
        <div className="form-group">
          <label htmlFor="player-image-url">Player Image Url</label>
          <input type="text" className="form-control" id="player-image-url" placeholder="https://www.google.com" value={this.state.playerImgUrl} onChange={this.addImgUrl} />
        </div>
        <div className="form-group">
          <label htmlFor="player-position">Player Poisition</label>
          <input type="text" className="form-control" id="player-position" placeholder="Forward" value={this.state.playerPosition} onChange={this.addPosition} />
        </div>
        {
          (!editMode) ? (<button className="btn btn-secondary" onClick={this.savePlayerEvent}>Add Player</button>)
            : (<button className="btn btn-warning" onClick={this.updatePlayerEvent}>Update Player</button>)
        }
      </form>
    );
  }
}

export default Form;
