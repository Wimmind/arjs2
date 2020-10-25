import React from 'react';
import { NavLink } from "react-router-dom";
import { ROUTES } from '../api';
import COMPONENTS from '../components';
import CONFIG from '../config';

export class Main extends React.Component {
  render() {
    return (
      <div className="page">
        <COMPONENTS.Header />
        <div className="fullSpace">
          <div className="buttons">
            <NavLink className="button" to={CONFIG.BASESUF + ROUTES.Desktop.path}>ПК</NavLink>
            <NavLink className="button" to={CONFIG.BASESUF + ROUTES.Mobile.path}>Мобильный</NavLink>
          </div>
        </div>
      </div>
    )
  }
}

export default Main;