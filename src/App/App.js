import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import './App.scss';
import authData from '../helpers/data/authData';
import Auth from '../components/Auth/Auth';
import MyNav from '../components/MyNav/MyNav';
import Team from '../components/Team/Team';
import Form from '../components/Form/Form';
import playerData from '../helpers/data/playerData';

authData.firebaseApp();

class App extends React.Component {
  state = {
    authed: false,
    showForm: false,
    editMode: false,
    playerToEdit: {},
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  editPlayer = (playerId, newPlayerObj) => {
    playerData.updatePlayer(playerId, newPlayerObj)
      .then(() => {
        this.setState({ editMode: false, showForm: false, playerToEdit: {} });
      }).catch((err) => console.error(err));
  }

  changeEditMode = (editMode) => {
    this.setState({ editMode, showForm: true });
  }

  setPlayerToEdit = (player) => {
    this.setState({ playerToEdit: player });
  }

  displayForm = () => {
    this.setState({ showForm: true });
  }

  addPlayer = (playerObj) => {
    playerData.newPlayer(playerObj)
      .then(() => {
        this.setState({ showForm: false });
      }).catch((err) => console.error(err));
  }

  renderView = () => {
    const {
      authed,
      showForm,
      editMode,
      playerToEdit,
    } = this.state;
    if (!authed) {
      return (<Auth />);
    }
    if (!showForm) {
      return (
        <div>
          <button className="btn btn-outline-light" onClick={this.displayForm}>Add Player</button>
          <Team changeEditMode={this.changeEditMode} setPlayerToEdit={this.setPlayerToEdit} />
        </div>
      );
    }
    return (<Form addNewPlayer={this.addPlayer} editPlayer={this.editPlayer} playerToEdit={playerToEdit} editMode={editMode} />);
  }

  render() {
    const { authed } = this.state;
    return (
      <div className="App">
        <MyNav authed={authed} />
        {
          this.renderView()
        }
      </div>
    );
  }
}

export default App;
