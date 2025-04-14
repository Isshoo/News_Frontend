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
      <button onClick={trainModel} disabled={loading}>
        {loading ? 'Training...' : 'Train Model'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

TrainButton.propTypes = {
  handleTrain: PropTypes.func.isRequired,
};

export default TrainButton;
