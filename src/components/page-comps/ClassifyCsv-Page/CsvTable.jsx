import React from 'react';
import PropTypes from 'prop-types';

const CsvTable = ({ csvData, handleEditCell, handleDeleteRow }) => (
  <div className='csv-table'>
    <table>
      <thead>
        <tr>
          <th>Content Snippet</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {csvData.map((row, index) => (
          <tr key={index}>
            <td>
              <input
                type='text'
                value={row.contentSnippet}
                onChange={(e) => handleEditCell(index, 'contentSnippet', e.target.value)}
              />
            </td>
            <td>
              <button onClick={() => handleDeleteRow(index)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

CsvTable.propTypes = {
  csvData: PropTypes.array.isRequired,
  handleEditCell: PropTypes.func.isRequired,
  handleDeleteRow: PropTypes.func.isRequired,
};

export default CsvTable;
