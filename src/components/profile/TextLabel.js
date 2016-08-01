import React, {PropTypes} from 'react';

const TextLabel = ({label}) => {
  return (
    <span
      className="label-control">
      {label}
    </span>
  );
};

TextLabel.propTypes = {
  label: PropTypes.string
};

export default TextLabel;
