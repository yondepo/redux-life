import React, {PropTypes} from 'react';

const onSelectOption = (action) => (e) => {
  let value = e.target.value;
  action(value);
};

const Select = ({options, selected, action}) => {
  const onChange = onSelectOption(action).bind(this);

  return (
    <div className="select-control">
      <select value={selected} onChange={onChange}>
        {options.map((option) =>
          <option key={option.size} value={option.size}>{option.label}</option>)}
      </select>
    </div>
  );
};

Select.propTypes = {
  options: PropTypes.array.isRequired,
  selected: PropTypes.number.isRequired
};

export default Select;
