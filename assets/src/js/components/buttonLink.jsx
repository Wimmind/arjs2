import { Link } from 'react-router-dom';
import React from 'react';

const ButtonLink = ({ title, styles, action, pathname }) => {
  return (
    <Link to={{ pathname: `${pathname}` }}>
      <button className={styles}>
        {title}
      </button>
    </Link>
  )
}

export default ButtonLink;