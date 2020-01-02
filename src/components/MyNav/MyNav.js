import './MyNav.scss';
import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';
import logo from './soccerball.png';

class MyNav extends React.Component {
  static propTypes = {
    authed: PropTypes.bool,
  }

  logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    const checkAuth = this.props.authed;

    return (
      <div className="MyNavbar">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <img src={logo} className="mr-2" alt="soccer ball" />
          <span className="navbar-brand" href="#">Sports Roster</span>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarToggler">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            </ul>
            <div className="form-inline my-2 my-lg-0">
              { (checkAuth) && (<button className="nav-link btn btn-outline-light" onClick={this.logMeOut}>Logout</button>)}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default MyNav;
