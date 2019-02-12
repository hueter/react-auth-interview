import React, { Component } from 'react';
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import withAuth from './withAuth';
import Home from './Home';
import Secret from './Secret';
import Login from './Login';
import WarningModal from './WarningModal';
import checkActiveUser, {
  debouncedCheckActiveUser
} from './helpers/checkActiveUser';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { modalOpen: false };
    this.listeningEvents = ['click', 'mousemove', 'touchstart'];
    this.bouncer = debouncedCheckActiveUser.bind(
      null,
      this.showWarningModal,
      this.logout
    );
  }

  startLogoutTimer = () => {
    // call once to initialize
    checkActiveUser(this.showWarningModal, this.logout);
    // add a debounced version to a bunch of events
    this.listeningEvents.map(event => {
      window.addEventListener(event, this.bouncer);
    });
  };

  toggleModal = () => {
    this.setState(st => {
      return { modalOpen: !st.modalOpen };
    });
  };

  showWarningModal = () => {
    this.setState({ modalOpen: true });
    console.log('WARNING YOU HAVE BEEN INACTIVE TOO LONG');
  };

  logout = () => {
    // set it for every type of event
    this.listeningEvents.forEach((event, i) => {
      window.removeEventListener(event, this.bouncer);
    });

    this.setState({ modalOpen: false }, () => {
      this.props.history.push('/login');
    });
  };

  render() {
    if (this.state.modalOpen) {
      return <WarningModal handleClick={this.toggleModal} />;
    }
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
            component={props => (
              <Login {...props} startLogoutTimer={this.startLogoutTimer} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
