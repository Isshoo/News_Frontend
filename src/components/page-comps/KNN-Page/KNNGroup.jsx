import React from 'react';
import PropTypes from 'prop-types';
import KNNTable from './KNNTable';

const KNNGroup = ({ group, index }) => {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <h3>Test Sample #{index}</h3>
      <p>
        <strong>True Label:</strong> {group.true_label}
      </p>
      <p>
        <strong>Predicted Label:</strong> {group.predicted_label}
      </p>
      <p>
        <strong>Text:</strong> {group.test_text}
      </p>
      <KNNTable neighbors={group.neighbors} />
    </div>
  );
};

KNNGroup.propTypes = {
  group: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default KNNGroup;
