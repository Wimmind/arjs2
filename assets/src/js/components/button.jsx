import React from 'react';
import API from '../api';

export class Button extends React.Component {
  render() {
    const { icon, title, onClick } = this.props;

    return (
      <div className={API.setClasses(['button'], {
        button_icon: icon
      })} onClick={onClick} >
        {icon ? <img className="button__img" src={icon} alt="" /> : title}
      </div>
    )
  }
}

Button.defaultProps = {
  onClick: () => false
}

export default Button;