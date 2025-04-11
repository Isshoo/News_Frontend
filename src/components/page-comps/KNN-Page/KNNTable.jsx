import React from 'react';
import PropTypes from 'prop-types';

const KNNTable = ({ neighbors }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Index</th>
          <th>Distance</th>
          <th>Label</th>
          <th>Text</th>
        </tr>
      </thead>
      <tbody>
        {neighbors.map((neighbor, i) => (
          <tr key={i}>
            <td>{neighbor.neighbor_index}</td>
            <td>{neighbor.neighbor_distance.toFixed(4)}</td>
            <td>{neighbor.neighbor_label}</td>
            <td>{neighbor.neighbor_text}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

KNNTable.propTypes = {
  neighbors: PropTypes.array.isRequired,
};

export default KNNTable;
