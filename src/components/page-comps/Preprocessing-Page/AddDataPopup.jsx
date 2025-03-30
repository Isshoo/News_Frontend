import React from 'react';
import PropTypes from 'prop-types';

const AddDataPopup = ({
  newContent,
  setNewContent,
  newTopic,
  setNewTopic,
  handleAddData,
  setShowAddPopup,
}) => {
  return (
    <div className='popup'>
      <h3>Add New Data</h3>
      <input
        type='text'
        placeholder='Content Snippet'
        value={newContent}
        onChange={(e) => setNewContent(e.target.value)}
      />
      <input
        type='text'
        placeholder='Topic'
        value={newTopic}
        onChange={(e) => setNewTopic(e.target.value)}
      />
      <button onClick={handleAddData}>Add</button>
      <button onClick={() => setShowAddPopup(false)}>Cancel</button>
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
