import React, { Component } from 'react';
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import withAuth from './withAuth';
import Home from './Home';
import Secret from './Secret';
import Login from './Login';
import debouncedCheckActiveUser from './helpers/checkActiveUser';

class App extends Component {
  startLogoutTimer = () => {
    ['click', 'mousemove', 'touchstart'].forEach(event => {
      document.addEventListener(event, () => {
        debouncedCheckActiveUser(this.showWarningModal, this.logout);
      });
    });
  };

  showWarningModal = () => {
    // use a portal
    console.log('WARNING YOU HAVE BEEN INACTIVE TOO LONG');
  };

  logout = () => {
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/secret">Secret</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/secret" component={withAuth(Secret)} />
          <Route
            path="/login"
            render={props => (
              <Login {...props} startLogoutTimer={this.startLogoutTimer} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
