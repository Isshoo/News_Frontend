import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TrainButton = ({ handleTrain, noDataset }) => {
  const [loading, setLoading] = useState(false);

  const trainModel = async () => {
    setLoading(true);

    const response = await handleTrain();

    setLoading(false);
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
      <button onClick={trainModel} disabled={loading || noDataset}>
        {loading ? 'Training...' : 'Train Model'}
      </button>
    </div>
  );
};

TrainButton.propTypes = {
  handleTrain: PropTypes.func.isRequired,
  noDataset: PropTypes.bool.isRequired,
};

export default TrainButton;
