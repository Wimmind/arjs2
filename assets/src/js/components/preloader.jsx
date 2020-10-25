import React from 'react';
import Overlay from './overlay';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import API from '../api';

export class Preloader extends React.Component {
  onClose = () => {
    const { isActiveName, onClose } = this.props;
    let state = { [isActiveName]: false };
    if (onClose) {
      onClose(state)
    }
    else {
      this.props.setRedux(state)
    }
  }

  render() {
    const { isActive, className } = this.props;

    if (!isActive) return false;
    return Preloader.html({ className })
  }
}

Preloader.defaultProps = {
  isActive: true,
  isActiveName: '',
  onClose: false,
  className: ""
}

Preloader.html = ({ className }) => (
  <Overlay className={className}>
    <div className='preloader'>
      <FontAwesomeIcon icon={faSpinner} spin size="3x" />
    </div>
  </Overlay>
)

export default API.connect(Preloader, ['']);