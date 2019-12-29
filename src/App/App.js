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
    const { authed, showForm } = this.state;
    if (!authed) {
      return (<Auth />);
    }
    if (!showForm) {
      return (
        <div>
          <button className="btn btn-outline-light" onClick={this.displayForm}>Add Player</button>
          <Team />
        </div>
      );
    }
    return (<Form addNewPlayer={this.addPlayer} />);
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
