import React from 'react';
import { ROUTES } from '../api';
import COMPONENTS from '../components';
import CONFIG from '../config'
import MODULES from '../modules';
import QrReader from 'react-qr-reader'
import API from '../api';

const DENIED = 'denied';

export class Mobile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isAccess: true,
      isQrDetect: true,
      isMuted: true,
      video_type: MODULES.ARTHREE.VIDEOTYPES.VERTICAL
    }
  }

  permissionStatus = async () => {
    let _state = {};

    try {
      let { state } = await navigator.permissions.query({ name: 'camera' });

      switch (state) {
        case 'prompt':
          _state['isAccess'] = false;
          break;
        case DENIED:
          _state['isAccess'] = state;
          break;
        default:
          _state['isAccess'] = true;
          break;
      }
    } catch (error) {
      _state['isAccess'] = true;
    }

    this.setState(_state)
  }

  requestPermission = () => navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(this.permissionStatus)
    .catch(this.permissionStatus)

  componentDidMount() {
    this.permissionStatus()
    this.setState({ video_type: MODULES.ARTHREE.VIDEOTYPES.VERTICAL }, () => {
      document.querySelector('#videoForThree').src = '/img/jiraf.jpg';
    })
  }

  renderError = () => (
    <div className="request">
      <img className="request__img" src="/img/error.png" alt="" />
      <div className="request__text">Вы запретили доступ к камере ранее. Включите доступ вручную</div>
      <div className="button button_center" onClick={this.requestPermission}>Проверить доступ к камере</div>
    </div>
  )

  onScan = data => {
    if (data) {

      const width = 800;
      const height = 600;

      this.setState({ isQrDetect: false })
      this.props.setRedux({ isPreloader: true })
      let end = (self) => {
        self.addMarker({ width, height, url: `marker/lime` })
        this.props.setRedux({ isPreloader: false })
      };

      if (this.ARTHREE) {
        end(this.ARTHREE)
      }
      else {
        this.ARTHREE = new MODULES.ARTHREE(end)
      }
    }
  }

  renderDetection = () => (
    <>
      {this.state.isQrDetect ?
        <QrReader onScan={this.onScan} className="qrReader" />
        :
        <>
        </>
      }
    </>
  )

  renderRequest = (props) => (
    <div className="request">
      <img className="request__img" src="/img/error.png" alt="" />
      <div className="request__text">К сожалению, без камеры, вы не сможете посмотреть свое видео</div>
      <div className="button button_center" onClick={this.requestPermission}>Дать доступ к камере</div>
    </div>
  )

  render() {
    const { isAccess } = this.state;
    return (
      <div className="page_camera">
        <COMPONENTS.ButtonLink
            title={'назад'}
            styles={'btn-link btn-link_blue btn-link_mobile'}
            pathname={CONFIG.BASESUF + ROUTES.Main.path}
          />
        {isAccess ? (isAccess === DENIED ? this.renderError() : this.renderDetection()) : this.renderRequest()}
      </div>
    )
  }
}

export default API.connect(Mobile);