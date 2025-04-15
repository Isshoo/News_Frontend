import React from 'react';
import PropTypes from 'prop-types';

const CsvTable = ({ csvData, handleEditCell, handleDeleteRow }) => (
  <div className='csv-table'>
    <table>
      <colgroup>
        <col style={{ width: '82%' }} />
        <col style={{ width: '18%' }} />
      </colgroup>
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
};

export default CsvTable;
