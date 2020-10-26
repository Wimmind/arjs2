import React from 'react';
import COMPONENTS from '../components';
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
    this.datas = [];
  }

  switchVideo = () => {
    let { video_type } = this.state;
    if (video_type === MODULES.ARTHREE.VIDEOTYPES.VERTICAL) {
      video_type = MODULES.ARTHREE.VIDEOTYPES.HORIZONTAL
    }
    else if (video_type === MODULES.ARTHREE.VIDEOTYPES.HORIZONTAL) {
      video_type = MODULES.ARTHREE.VIDEOTYPES.RECTANGLE;
    }
    else {
      video_type = MODULES.ARTHREE.VIDEOTYPES.VERTICAL;
    }
    this.setState({ video_type }, () => {
      document.querySelector('#videoForThree').src = MODULES.ARTHREE[video_type]
    })
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
      document.querySelector('#videoForThree').src = MODULES.ARTHREE[MODULES.ARTHREE.VIDEOTYPES.VERTICAL]
    })
    // this.ARTHREE = new MODULES.ARTHREE()
  }

  renderError = () => (
    <div className="request">
      <img className="request__img" src="/img/error.png" alt="" />
      <div className="request__text">Вы запретили доступ к камере ранее. Включите доступ вручную</div>
      <div className="button button_center" onClick={this.requestPermission}>Проверить доступ к камере</div>
    </div>
  )

  onStartVideo = () => {
    // this.ARTHREE.addMarker()
  }

  onScan = data => {
    let params = [
      [676, 676],
      [676, 849],
      [923, 568],
      [923, 602],
    ];

    if (data) {
      if (this.datas.indexOf(data) === -1) {
        data = JSON.parse(data);
        let [width, height] = params[parseInt(data)];
        this.datas.push(data)
        this.setState({ isQrDetect: false })
        this.props.setRedux({ isPreloader: true })
        let end = (self) => {
          self.addMarker({ width, height, url: `marker/${width}x${height}/${width}x${height}` })
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
  }

  toggleMute = () => {
    let { isMuted } = this.state;
    isMuted = !isMuted;
    document.querySelector('#videoForThree').muted = isMuted;
    this.setState({ isMuted })
  }

  onReset = () => {
    this.setState({ isQrDetect: true })
    this.ARTHREE.remove()
  }

  renderDetection = () => (
    <>
      {this.state.isQrDetect ?
        <>
          <QrReader onScan={this.onScan} className="qrReader" />
          <div className="request__title">Наведите камеру на фото, чтобы отсканировать код видео</div>
          <img className="request__img request__img_border" src="./img/border.svg" alt="" />
          <div className="buttons">
            <COMPONENTS.Button title={`Video: ${this.state.video_type}`} onClick={this.switchVideo} />
          </div>
        </>
        :
        <>
          <div className="request__title">Наведите камеру на фото, чтобы отсканировать код видео</div>
          <img className="request__img request__img_border" src="./img/border.svg" alt="" />
          <div className="buttons">
            <COMPONENTS.Button title="Сбросить" onClick={this.onReset} />
            <COMPONENTS.Button title={this.state.isMuted ? "Включить звук" : "Выключить звук"} onClick={this.toggleMute} />
          </div>
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
        {isAccess ? (isAccess === DENIED ? this.renderError() : this.renderDetection()) : this.renderRequest()}
      </div>
    )
  }
}

export default API.connect(Mobile);