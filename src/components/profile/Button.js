import React, {PropTypes} from 'react';

const Button = ({onclick, label}) => {
  return (
    <button
      className="button-control"
      onClick={onclick}>
      {label}
    </button>
  );
};

export default Button;
