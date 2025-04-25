import React from 'react';
import PropTypes from 'prop-types';
import KNNTable from './KNNTable';

const KNNGroup = ({ group, index }) => {
  return (
    <>
      <div className='knn-group-header'>
        <h3>Test Sample #{index + 1}</h3>
      </div>

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
