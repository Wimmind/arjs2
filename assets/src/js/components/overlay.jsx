import React from 'react';
import API from '../api';

export function Overlay(props) {
  const { children, onClose, className } = props;

  return (
    <div className={API.setClasses(['overlay', className])}>
      <div className="overlay__closer" onClick={onClose} />
      {children}
    </div>
  )
}

Overlay.defaultProps = {
  className: '',
  onClose: () => false
}

export default Overlay;