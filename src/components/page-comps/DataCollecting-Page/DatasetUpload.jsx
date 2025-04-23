import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaCloudArrowUp } from 'react-icons/fa6';
import { FaTimes } from 'react-icons/fa';

const DatasetUpload = ({ onUpload, uploading, selectedDataset }) => {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      await onUpload(file);
      setFile(null);
      setShowModal(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleClearFile = () => {
    setFile(null);
  };

  // CASE: Selected Dataset and no file => show button to open modal
  if (selectedDataset && !file) {
    return (
      <>
        <div className='dataset-open-upload'>
          <button type='button' className='open-upload-btn' onClick={() => setShowModal(true)}>
            <FaCloudArrowUp />
          </button>
        </div>

        <div className={`upload-modal ${showModal ? 'show' : ''}`}>
          <div className='modal-content'>
            <button className='close-modal-btn' onClick={() => setShowModal(false)}>
              &times;
            </button>

            <form
              className={`upload-box ${dragActive ? 'active' : ''}`}
              onSubmit={handleSubmit}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <label className='upload-area'>
                <FaCloudArrowUp className='cloud-icon' />
                <p className='upload-title'>Drag and drop CSV file here</p>
                <p className='upload-or'>or</p>

                <div className='browse-container'>
                  <input
                    type='file'
                    accept='.csv'
                    onChange={handleChange}
                    disabled={uploading}
                    className='upload-input'
                  />
                  <div className='browse-button'>Browse Files</div>
                </div>
                <div className='upload-note-container'>
                  <p className='upload-note'>
                    <strong>Note: </strong>
                  </p>
                  <p className='upload-note'>
                    CSV file must have &apos;contentSnippet&apos; and &apos;topik&apos; columns. And
                    the &apos;topik&apos; column must have{' '}
                    <strong>ekonomi, gayahidup, olahraga, teknologi, hiburan</strong> classes.
                  </p>
                </div>
              </label>
            </form>
          </div>
        </div>
      </>
    );
  }

  // CASE: File selected, show preview with upload button
  if (file) {
    return (
      <div className={`upload-modal ${showModal ? 'show' : 'show'}`}>
        <div className='modal-content'>
          <form className='upload-box' onSubmit={handleSubmit}>
            <div className='file-preview'>
              <span className='file-name'>
                {file.name}
                <button
                  type='button'
                  className='clear-file-btn'
                  disabled={uploading}
                  onClick={handleClearFile}
                  title='Clear file'
                >
                  <FaTimes />
                </button>
              </span>
              <button type='submit' className='upload-button-collect-data' disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload Dataset'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // CASE: No selectedDataset or file, show default full form
  return (
    <form
      className={`upload-box ${dragActive ? 'active' : ''}`}
      onSubmit={handleSubmit}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <label className='upload-area'>
        <FaCloudArrowUp className='cloud-icon' />
        <p className='upload-title'>Drag and drop CSV file here</p>
        <p className='upload-or'>or</p>

        <div className='browse-container'>
          <input
            type='file'
            accept='.csv'
            onChange={handleChange}
            disabled={uploading}
            className='upload-input'
          />
          <div className='browse-button'>Browse Files</div>
        </div>
        <div className='upload-note-container'>
          <p className='upload-note'>
            <strong>Note: </strong>
          </p>
          <p className='upload-note'>
            CSV file must have &apos;contentSnippet&apos; and &apos;topik&apos; columns. And the
            &apos;topik&apos; column must have{' '}
            <strong>ekonomi, gayahidup, olahraga, teknologi, hiburan</strong> classes.
          </p>
        </div>
      </label>
    </form>
  );
};

DatasetUpload.propTypes = {
  onUpload: PropTypes.func.isRequired,
  uploading: PropTypes.bool.isRequired,
  selectedDataset: PropTypes.string,
};

export default DatasetUpload;
