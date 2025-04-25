import React from 'react';
import PropTypes from 'prop-types';

const KNNTable = ({ neighbors, index }) => {
  return (
    <div className='knn-table'>
      <h4>Nearest Neighbors:</h4>
      <table className='dataset-info-table'>
        <colgroup>
          <col style={{ width: '8%' }} />
          <col style={{ width: '70%' }} />
          <col style={{ width: '11%' }} />
          <col style={{ width: '11%' }} />
        </colgroup>
        <thead>
          <tr>
            <th>Index</th>
            <th>Text</th>
            <th>Distance</th>
            <th>Label</th>
          </tr>
        </thead>
        <tbody>
          {neighbors.map((neighbor, i) => (
            <tr key={i}>
              <td>{neighbor.neighbor_index + 1}</td>
              <td className='justify'>{neighbor.neighbor_text}</td>
              <td>{neighbor.neighbor_distance.toFixed(4)}</td>
              <td>{neighbor.neighbor_label}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

KNNTable.propTypes = {
  neighbors: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
};

export default KNNTable;
