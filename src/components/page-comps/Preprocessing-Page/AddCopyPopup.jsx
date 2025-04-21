import React from 'react';
import PropTypes from 'prop-types';

const AddCopyPopup = ({ newCopyName, setNewCopyName, handleCopyDataset, setShowCopyPopup }) => {
  return (
    <div className='popup-overlay'>
      <div className='popup-box'>
        <div className='popup-header'>
          <h3>Copy preprocessed Dataset</h3>
          <button className='popup-close' onClick={() => setShowCopyPopup(false)}>
            ✕
          </button>
        </div>
        <div className='popup-body'>
          <input
            type='text'
            placeholder='New Dataset Name'
            value={newCopyName}
            onChange={(e) => setNewCopyName(e.target.value)}
          />
        </div>
        <div className='popup-actions'>
          <button className='popup-btn primary' onClick={handleCopyDataset} disabled={!newCopyName}>
            Make New Copy
          </button>
          <button className='popup-btn' onClick={() => setShowCopyPopup(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

AddCopyPopup.propTypes = {
  newCopyName: PropTypes.string.isRequired,
  setNewCopyName: PropTypes.func.isRequired,
  handleCopyDataset: PropTypes.func.isRequired,
  setShowCopyPopup: PropTypes.func.isRequired,
};

export default AddCopyPopup;
