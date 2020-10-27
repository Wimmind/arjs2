import React from 'react';
import API from '../api';
import { ROUTES } from '../api';
import COMPONENTS from '../components';
import CONFIG from '../config'
const count = 0, MARKERS = ['676x676'];

export class Desktop extends React.Component {
  render() {

    return (
      <div className="page pc-page">
        <COMPONENTS.ButtonLink
          title={'назад'}
          styles={'btn-link btn-link_blue'}
          pathname={CONFIG.BASESUF + ROUTES.Main.path}
        />
        <div className="marker__wrapper">
          <div className="marker__container">
            <img className="marker__img" alt="" src={`/marker/lime.png`} />
            <img className="marker__qrcode" alt="" src={`/marker/qr-code.png`} />
          </div>
        </div>
      </div>
    )
  }
}

export default Desktop;