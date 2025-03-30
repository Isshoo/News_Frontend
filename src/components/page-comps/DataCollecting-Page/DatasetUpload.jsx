import React, { useState } from 'react';
import PropTypes from 'prop-types';

function DatasetUpload({ onUpload, uploading }) {
  const [file, setFile] = useState(null);

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (file) {
      onUpload(file);
      setFile(null);
    } else {
      alert('Please select a file to upload.');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type='file' accept='.csv' onChange={handleChange} disabled={uploading} />
      <button type='submit' disabled={uploading || !file}>
        {uploading ? 'Uploading...' : 'Upload Dataset'}
      </button>
    </form>
  );
}

DatasetUpload.propTypes = {
  onUpload: PropTypes.func.isRequired,
  uploading: PropTypes.bool.isRequired,
};

export default DatasetUpload;
