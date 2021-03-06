import React, {PropTypes} from 'react';

const onSelectOption = (action) => (e) => {
  let value = e.target.value;
  action(value);
};

const Select = ({options, selected, action}) => {
  const onChange = onSelectOption(action).bind(this);

  return (
    <div className="control select-control">
      <select value={selected} onChange={onChange}>
        {options.map((option) =>
          <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </div>
  );
};

Select.propTypes = {
  options: PropTypes.array.isRequired,
  selected: PropTypes.string.isRequired
};

export default Select;
