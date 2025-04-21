// src/components/page-comps/Parameters-Page/SplitSelector.jsx
import React from 'react';
import PropTypes from 'prop-types';

const SplitSelector = ({ value, onChange, loading }) => (
  <div className='train-test-split modelDropdown'>
    <select
      className='modelSelect train-test-select'
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      disabled={loading}
    >
      <option value={0} disabled>
        Select Split Size
      </option>
      <option value={0.5}>50-50</option>
      <option value={0.4}>60-40</option>
      <option value={0.3}>70-30</option>
      <option value={0.25}>75-25</option>
      <option value={0.2}>80-20</option>
    </select>
  </div>
);
SplitSelector.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default SplitSelector;
