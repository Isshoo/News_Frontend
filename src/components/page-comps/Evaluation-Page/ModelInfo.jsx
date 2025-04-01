import React from 'react';
import PropTypes from 'prop-types';

const ModelInfo = ({ evaluationData }) => {
  const { name, n_neighbors, preprocessed_dataset_id, total_data } = evaluationData;

  return (
    <div>
      <h3>Model Information</h3>
      <p>
        <strong>Model Name:</strong> {name}
      </p>
      <p>
        <strong>n_neighbors:</strong> {n_neighbors}
      </p>
      <p>
        <strong>Dataset ID:</strong> {preprocessed_dataset_id}
      </p>
      <p>
        <strong>Total Data:</strong> {total_data}
      </p>
    </div>
  );
};

ModelInfo.propTypes = {
  evaluationData: PropTypes.object.isRequired,
};

export default ModelInfo;
