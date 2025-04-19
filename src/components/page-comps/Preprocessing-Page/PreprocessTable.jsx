import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../../Base/LoadingBar';
import { MdInfoOutline } from 'react-icons/md';
import { DatasetSelect } from '../../Base/Select';

const PreprocessTable = ({
  dataset,
  editingIndex,
  newLabel,
  setNewLabel,
  newPreprocessedContent,
  setNewPreprocessedContent,
  handleEdit,
  handleSave,
  handleDelete,
  preprocessedDatasetId,
  rawDatasetId,
  loading,
  preprocessedDatasets,
  selectedPreprocessedDataset,
  handleDatasetSelection,
  isLoading,
  totalData,
  setShowInfo,
}) => {
  const labelOptions = ['ekonomi', 'gayahidup', 'hiburan', 'olahraga', 'teknologi'];

  return (
    <div className='preprocess-table'>
      <div className='dataset-table-header'>
        <div className='dataset-select-upload'>
          <DatasetSelect
            datasets={preprocessedDatasets}
            selectedDataset={selectedPreprocessedDataset}
            handleDatasetSelection={handleDatasetSelection}
            loading={isLoading}
          />
        </div>
        <div className='dataset-table-header-info'>
          <p>
            <strong>Total Data: {totalData}</strong>
          </p>
          <button onClick={() => setShowInfo(true)}>
            <MdInfoOutline className='info-icon' />
          </button>
        </div>
      </div>
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
                  <col style={{ width: '37.5%' }} />
                  <col style={{ width: '37.5%' }} />
                  <col style={{ width: '11%' }} />
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
                  <td colSpan='4' style={{ textAlign: 'center' }}>
                    No data available.
                  </td>
                </tr>
              ) : (
                dataset.map((item) => (
                  <tr key={item.index}>
                    <td>
                      <p className='preprocessed-content-text'>{item.index + 1}</p>
                    </td>
                    <td title={item.contentSnippet}>
                      <p className='preprocessed-content-text'>{item.contentSnippet}</p>
                    </td>
                    <td title={item.preprocessedContent}>
                      {editingIndex === item.index ? (
                        <textarea
                          className='preprocessed-content-input'
                          placeholder='Preprocessed Content'
                          value={newPreprocessedContent}
                          onChange={(e) => setNewPreprocessedContent(e.target.value)}
                        />
                      ) : (
                        <p className='preprocessed-content-text'>{item.preprocessedContent}</p>
                      )}
                    </td>
                    <td>
                      {editingIndex === item.index ? (
                        <select
                          className='preprocessed-content-select'
                          value={newLabel}
                          onChange={(e) => setNewLabel(e.target.value)}
                        >
                          {labelOptions.map((label, i) => (
                            <option key={i} value={label}>
                              <p className='preprocessed-content-text'>{label}</p>
                            </option>
                          ))}
                        </select>
                      ) : (
                        <p className='preprocessed-content-text'>{item.topik}</p>
                      )}
                    </td>

                    {preprocessedDatasetId === rawDatasetId ? (
                      ''
                    ) : (
                      <td className='actions-cell'>
                        {editingIndex === item.index ? (
                          <button
                            className='preprocess-action-button'
                            onClick={() => handleSave(item.index)}
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            className='preprocess-action-button'
                            onClick={() =>
                              handleEdit(item.index, item.topik, item.preprocessedContent)
                            }
                          >
                            Edit
                          </button>
                        )}
                        <button
                          className='preprocess-action-button'
                          onClick={() => handleDelete(item.index)}
                        >
                          Delete
                        </button>
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
  newPreprocessedContent: PropTypes.string,
  setNewPreprocessedContent: PropTypes.func,
  handleEdit: PropTypes.func,
  handleSave: PropTypes.func,
  handleDelete: PropTypes.func,
  preprocessedDatasetId: PropTypes.string,
  rawDatasetId: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  preprocessedDatasets: PropTypes.array.isRequired,
  selectedPreprocessedDataset: PropTypes.string,
  handleDatasetSelection: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  totalData: PropTypes.number.isRequired,
  setShowInfo: PropTypes.func.isRequired,
};

export default PreprocessTable;
