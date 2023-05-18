import React from 'react';

const SizeSelector = ({ size, handleSizeChange }) => {
  return (
    <div>
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