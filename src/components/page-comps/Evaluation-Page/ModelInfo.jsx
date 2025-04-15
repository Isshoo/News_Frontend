import React from 'react';
import PropTypes from 'prop-types';

const ModelInfo = ({ evaluationData }) => {
  const { name, total_data } = evaluationData;
  console.log(name);
  console.log(total_data);

  return (
    <div>
      <h2>Model Information</h2>
      <p>
        <strong>Model Name:</strong> {name}
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
