import './Auth.scss';
import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import googleIcon from './assets/images/googCircleIcon.png';

class Auth extends React.Component {
  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  render() {
    return (
      <div id="auth">
        <button className="btn btn-light" onClick={this.loginClickEvent}><img className="googleIcon" src={googleIcon} alt="google logo" />Log In with Google</button>
      </div>
    );
  }
}

export default Auth;
