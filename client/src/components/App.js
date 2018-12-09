import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Landing from './Landing';
import SignInContainer from '../containers/SignInContainer';
import SignUpContainer from '../containers/SignUpContainer';

import Header from './layout/Header';
import Footer from './layout/Footer';

function App(props) {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/signin" exact component={SignInContainer} />
          <Route path="/signup" exact component={SignUpContainer} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
};

export default App;