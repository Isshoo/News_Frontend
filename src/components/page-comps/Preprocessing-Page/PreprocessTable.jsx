import React from 'react';
import PropTypes from 'prop-types';

const PreprocessTable = ({
  dataset,
  editingIndex,
  newLabel,
  setNewLabel,
  handleEdit,
  handleSave,
  handleDelete,
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Original Content</th>
          <th>Processed Content</th>
          <th>Topic</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {dataset.map((item, index) => (
          <tr key={index}>
            <td>{item.index + 1}</td>
            <td>{item.contentSnippet}</td>
            <td>{item.preprocessedContent}</td>
            <td>
              {editingIndex === index ? (
                <input type='text' value={newLabel} onChange={(e) => setNewLabel(e.target.value)} />
              ) : (
                item.topik
              )}
            </td>
            <td>
              {editingIndex === index ? (
                <button onClick={() => handleSave(index)}>Save</button>
              ) : (
                <button onClick={() => handleEdit(index, item.topik)}>Edit</button>
              )}
              <button onClick={() => handleDelete(index)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

PreprocessTable.propTypes = {
  dataset: PropTypes.array.isRequired,
  editingIndex: PropTypes.number,
  newLabel: PropTypes.string,
  setNewLabel: PropTypes.func,
  handleEdit: PropTypes.func,
  handleSave: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default PreprocessTable;
