// src/components/page-comps/Parameters-Page/ModelConfigForm.jsx
import React from 'react';
import PropTypes from 'prop-types';
import NNeighborsInput from './NNeighborsInput';

const ModelConfigForm = ({ name, onChange, nNeighbors, handleNNeighborsChange }) => (
  <div className='model-config-form'>
    <div className='form-group nama-model'>
      <label>Name</label>
      <input type='text' value={name || ''} onChange={onChange} placeholder='Input model name' />
    </div>
    <NNeighborsInput value={nNeighbors} onChange={handleNNeighborsChange} />
  </div>
);
ModelConfigForm.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  nNeighbors: PropTypes.number,
  handleNNeighborsChange: PropTypes.func.isRequired,
};

export default ModelConfigForm;
