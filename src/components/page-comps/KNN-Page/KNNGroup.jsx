import React from 'react';
import PropTypes from 'prop-types';
import KNNTable from './KNNTable';

const KNNGroup = ({ group, index }) => {
  return (
    <>
      <h3>Test Sample #{index + 1}</h3>
      <p>
        <strong>True Label:</strong> {group.true_label}
      </p>
      <p>
        <strong>Predicted Label:</strong> {group.predicted_label}
      </p>
      <p>
        <strong>Text:</strong> {group.test_text}
      </p>
      <KNNTable neighbors={group.neighbors} index={index} />
    </>
  );
};

KNNGroup.propTypes = {
  group: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default KNNGroup;
