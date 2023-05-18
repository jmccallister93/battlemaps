import React from 'react';
import s from '../style/main.module.scss'

const SizeSelector = ({ size, handleSizeChange }) => {
  return (
    <div className={s.sizeRadio}>
      <h3>Select Map Size</h3>
      <label>
        <input
          type="radio"
          value="small"
          checked={size === 'small'}
          onChange={handleSizeChange}
        />
        Small
      </label>
      <label>
        <input
          type="radio"
          value="medium"
          checked={size === 'medium'}
          onChange={handleSizeChange}
        />
        Medium
      </label>
      <label>
        <input
          type="radio"
          value="large"
          checked={size === 'large'}
          onChange={handleSizeChange}
        />
        Large
      </label>
    </div>
  );
};

export default SizeSelector;