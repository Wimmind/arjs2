import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import API, { ROUTES } from './api';
import CONFIG from './config';
import PAGES from './pages';
import COMPONENTS from './components';
import { isBrowser } from "react-device-detect";

const PRELOADERNAME = 'isPreloader';

class App extends React.Component {
  render() {

    return (
      <div className="app">
        <COMPONENTS.Preloader
          isActive={this.props[PRELOADERNAME]}
          isActiveName={PRELOADERNAME}
        />
        {isBrowser ? <PAGES.Desktop /> : <PAGES.Mobile />}

        {/* <Router>
          <Switch>
            {Object.keys(ROUTES).map(name => (
              <Route
                exact
                {...ROUTES[name]}
                path={CONFIG.BASESUF + ROUTES[name].path}
                key={name}
                component={PAGES[name] ? PAGES[name] : false}
              />
            ))}
          </Switch>
        </Router> */}
      </div>
    )
  }
}

export default API.connect(App);
