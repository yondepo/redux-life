import React, {PropTypes} from 'react';

const TextLabel = ({label}) => {
  return (
    <span
      className="label-control">
      {label}
    </span>
  );
};

export default TextLabel;
