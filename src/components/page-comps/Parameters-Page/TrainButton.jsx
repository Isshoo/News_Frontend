import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TrainButton = ({ handleTrain, noDataset, trainLoading }) => {
  const trainModel = async () => {
    await handleTrain();
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
      <button onClick={trainModel} disabled={trainLoading || noDataset}>
        {trainLoading ? 'Training...' : 'Train Model'}
      </button>
    </div>
  );
};

TrainButton.propTypes = {
  handleTrain: PropTypes.func.isRequired,
  noDataset: PropTypes.bool.isRequired,
  trainLoading: PropTypes.bool.isRequired,
};

export default TrainButton;
