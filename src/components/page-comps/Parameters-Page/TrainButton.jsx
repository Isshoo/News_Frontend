import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TrainButton = ({ handleTrain }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const trainModel = async () => {
    setLoading(true);
    setMessage('');

    const response = await handleTrain();

    setLoading(false);
    if (!response.error) {
      setMessage('Model trained successfully!');
    } else {
      setMessage('Failed to train model.');
    }
  };

  return (
    <div className='TrainButton'>
      <div className='train-text'>
        <p className='upload-note'>
          <strong>Note: </strong>
        </p>
        <p className='upload-note'>
          Training model will take a few steps, such as <strong>Vectorizing</strong> to extracting
          feature, and <strong>C5.0-KNN</strong> algorithm to classify.
        </p>
      </div>
      <button onClick={trainModel} disabled={loading}>
        {loading ? 'Training...' : 'Train Model'}
      </button>
    </div>
  );
};

TrainButton.propTypes = {
  handleTrain: PropTypes.func.isRequired,
};

export default TrainButton;
