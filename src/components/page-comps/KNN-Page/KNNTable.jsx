import React from 'react';
import PropTypes from 'prop-types';

const KNNTable = ({ neighbors, index }) => {
  return (
    <div className='knn-table'>
      <h3>Test Sample #{index + 1} Nearest Neighbors</h3>
      <table>
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
              <td>{neighbor.neighbor_text}</td>
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
