import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../../Base/LoadingBar';

const PreprocessTable = ({
  dataset,
  editingIndex,
  newLabel,
  setNewLabel,
  handleEdit,
  handleSave,
  handleDelete,
  preprocessedDatasetId,
  rawDatasetId,
  loading,
}) => {
  return (
    <div className='preprocess-table'>
      <h2>Preprocessed Dataset</h2>
      {loading ? (
        <Loading />
      ) : (
        <>
          <table>
            <colgroup>
              {preprocessedDatasetId === rawDatasetId ? (
                <>
                  <col style={{ width: '5%' }} />
                  <col style={{ width: '41.5%' }} />
                  <col style={{ width: '41.5%' }} />
                  <col style={{ width: '12%' }} />
                </>
              ) : (
                <>
                  <col style={{ width: '4%' }} />
                  <col style={{ width: '38%' }} />
                  <col style={{ width: '38%' }} />
                  <col style={{ width: '10%' }} />
                  <col style={{ width: '10%' }} />
                </>
              )}
            </colgroup>
            <thead>
              <tr>
                <th>ID</th>
                <th>Original Content</th>
                <th>Processed Content</th>
                <th>Topic</th>
                {preprocessedDatasetId === rawDatasetId ? '' : <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {dataset.length === 0 ? (
                <tr>
                  <td colSpan='3'>No data available.</td>
                </tr>
              ) : (
                dataset.map((item) => (
                  <tr key={item.index}>
                    <td>{item.index + 1}</td>
                    <td title={item.contentSnippet}>{item.contentSnippet}</td>
                    <td title={item.preprocessedContent}>{item.preprocessedContent}</td>
                    <td>
                      {editingIndex === item.index ? (
                        <input
                          type='text'
                          value={newLabel}
                          onChange={(e) => setNewLabel(e.target.value)}
                        />
                      ) : (
                        item.topik
                      )}
                    </td>
                    {preprocessedDatasetId === rawDatasetId ? (
                      ''
                    ) : (
                      <td className='actions-cell'>
                        {editingIndex === item.index ? (
                          <button onClick={() => handleSave(item.index)}>Save</button>
                        ) : (
                          <button onClick={() => handleEdit(item.index, item.topik)}>Edit</button>
                        )}
                        <button onClick={() => handleDelete(item.index)}>Delete</button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
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
  preprocessedDatasetId: PropTypes.string,
  rawDatasetId: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default PreprocessTable;
