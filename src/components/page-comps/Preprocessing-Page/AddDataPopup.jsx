import React from 'react';
import PropTypes from 'prop-types';
import { mapLabelResult } from '../../../utils/helper';

const AddDataPopup = ({
  newContent,
  setNewContent,
  newTopic,
  setNewTopic,
  handleAddData,
  setShowAddPopup,
}) => {
  const labelOptions = ['ekonomi', 'gayahidup', 'hiburan', 'olahraga', 'teknologi'];
  return (
    <div className='popup-overlay'>
      <div className='popup-box'>
        <div className='popup-header'>
          <h3>Add New Data</h3>
          <button className='popup-close' onClick={() => setShowAddPopup(false)}>
            ✕
          </button>
        </div>
        <div className='popup-body'>
          <input
            type='text'
            placeholder='Content Snippet'
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
          <select value={newTopic} onChange={(e) => setNewTopic(e.target.value)}>
            <option value='' disabled>
              Select Topik
            </option>
            {labelOptions.map((label, i) => (
              <option key={i} value={label}>
                {mapLabelResult(label)}
              </option>
            ))}
          </select>
        </div>
        <div className='popup-actions'>
          <button
            className='popup-btn primary'
            onClick={handleAddData}
            disabled={!newContent || !newTopic}
          >
            Add
          </button>
          <button className='popup-btn' onClick={() => setShowAddPopup(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

AddDataPopup.propTypes = {
  newContent: PropTypes.string.isRequired,
  setNewContent: PropTypes.func.isRequired,
  newTopic: PropTypes.string.isRequired,
  setNewTopic: PropTypes.func.isRequired,
  handleAddData: PropTypes.func.isRequired,
  setShowAddPopup: PropTypes.func.isRequired,
};

export default AddDataPopup;
