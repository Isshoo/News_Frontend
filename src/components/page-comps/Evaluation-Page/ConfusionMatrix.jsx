import React from 'react';
import PropTypes from 'prop-types';

const ConfusionMatrix = ({ confusionMatrix }) => {
  return (
    <div>
      <h3>Confusion Matrix</h3>
      <pre>{JSON.stringify(confusionMatrix, null, 2)}</pre>
    </div>
  );
};

ConfusionMatrix.propTypes = {
  confusionMatrix: PropTypes.array.isRequired,
};

export default ConfusionMatrix;
