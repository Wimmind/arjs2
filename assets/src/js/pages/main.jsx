import React from 'react';
import { ROUTES } from '../api';
import COMPONENTS from '../components';
import CONFIG from '../config';

export class Main extends React.Component {
  render() {
    return (
      <div className="page main-page">
        <div className="main-page_group-buttons">
          <COMPONENTS.ButtonLink
            title={'пк'}
            styles={'btn-link btn-link_blue'}
            pathname={CONFIG.BASESUF + ROUTES.Desktop.path} />
          <COMPONENTS.ButtonLink
            title={'телефон'}
            styles={'btn-link btn-link_red'}
            pathname={CONFIG.BASESUF + ROUTES.Mobile.path} />
        </div>
      </div>
    )
  }
}

export default Main;