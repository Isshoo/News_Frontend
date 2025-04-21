// src/components/page-comps/Parameters-Page/NNeighborsInput.jsx
import React from 'react';
import PropTypes from 'prop-types';

const NNeighborsInput = ({ value, onChange }) => (
  <div className='form-group neighbors'>
    <label>
      <i>k</i> neighbors
    </label>
    <input type='number' value={value} onChange={(e) => onChange(Number(e.target.value))} min='1' />
  </div>
);

NNeighborsInput.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default NNeighborsInput;
