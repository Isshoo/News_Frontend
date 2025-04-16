import React from 'react';
import PropTypes from 'prop-types';

const CsvTable = ({ csvData, handleEditCell, handleDeleteRow, startIndex }) => (
  <div className='csv-table'>
    <table>
      <colgroup>
        <col style={{ width: '5%' }} />
        <col style={{ width: '80%' }} />
        <col style={{ width: '15%' }} />
      </colgroup>
      <thead>
        <tr>
          <th>No</th>
          <th>Content Snippet</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {csvData.map((row, index) => (
          <tr key={index}>
            <td>{startIndex + index + 1}</td>
            <td>
              <input
                type='text'
                style={{ maxHeight: '3.6em', overflow: 'hidden' }}
                value={row.contentSnippet}
                onChange={(e) => handleEditCell(index, 'contentSnippet', e.target.value)}
              />
            </td>
            <td className='csv-actions'>
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
  startIndex: PropTypes.number.isRequired,
};

export default CsvTable;
