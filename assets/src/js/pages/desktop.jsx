import React from 'react';
import API, { ROUTES } from '../api';
import { NavLink } from 'react-router-dom';
import CONFIG from '../config';
const MIN = 0, MAX = 4, MARKERS = ['676x676', '676x849', '923x568', '923x602'];

export class Desktop extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }
  onClickPrev = () => {
    let { count } = this.state;
    if (count === MIN) return false;
    if (--count >= MIN) this.setState({ count })
  }

  onClickNext = () => {
    let { count } = this.state;
    if (count === MAX - 1) return false;
    if (++count < MAX) this.setState({ count })
  }

  render() {
    const { count } = this.state;

    return (
      <div className="page">
        <div className="header">
          <img alt="" src="./img/logo.png" />
        </div>
        <div className="fullSpace">
          <div className="markerWrapper">
            <div className={API.setClasses(['marker', `marker_${count}`])}>
              <img className="marker__img" alt="" src={`/marker/${MARKERS[count]}/${MARKERS[count]}.png`} />
              <img className="marker__qrcode" alt="" src={`/marker/${MARKERS[count]}/qr-code.png`} />
            </div>
          </div>
          <div className="buttons">
            <div className={API.setClasses(['button'], {
              button_disabled: count === MIN
            })} onClick={this.onClickPrev}>Пред. Макет</div>
            <div className={API.setClasses(['button'], {
              button_disabled: count === MAX - 1
            })} onClick={this.onClickNext}>Сл. Макет</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Desktop;