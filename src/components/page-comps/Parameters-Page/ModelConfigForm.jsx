// src/components/page-comps/Parameters-Page/ModelConfigForm.jsx
import React from 'react';
import PropTypes from 'prop-types';

const ModelConfigForm = ({ name, onChange, loading }) => (
  <div className='form-section'>
    <h3 className='section-subtitle'>Model Configuration</h3>
    <div className='form-group'>
      <label>Nama Model</label>
      <input
        type='text'
        value={name || ''}
        onChange={onChange}
        disabled={loading}
        placeholder='Masukkan nama model'
      />
    </div>
  </div>
);
ModelConfigForm.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ModelConfigForm;
