import React, {PropTypes} from 'react';

const Button = ({onclick, label, fa}) => {
  return (
    <button
      className="button-control"
      onClick={onclick}>
      <i className={`fa fa-${fa}`} aria-hidden="true"></i>
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  onclick: PropTypes.func.isRequired,
  fa: PropTypes.string
};

export default Button;
