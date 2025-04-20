import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Loading from '../../Base/LoadingBar';
import { MdInfoOutline } from 'react-icons/md';
// trash icon from react-icons
import { MdDelete } from 'react-icons/md';
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
  handleDeleteDataset,
}) => {
  const labelOptions = ['ekonomi', 'gayahidup', 'hiburan', 'olahraga', 'teknologi'];
  const textareaRef = useRef();

  const selectedPrerpocessedDatasetName = preprocessedDatasets.find(
    (dataset) => dataset.id === selectedPreprocessedDataset
  )?.name;

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // reset dulu
      textarea.style.height = `${textarea.scrollHeight}px`; // set ulang sesuai isi
    }
  }, [newPreprocessedContent]);

  return (
    <div className='preprocess-table'>
      <div className='dataset-table-header'>
        <div className='dataset-select-upload'>
          <h2>Preprocessed Dataset:</h2>
          <DatasetSelect
            datasets={preprocessedDatasets}
            selectedDataset={selectedPreprocessedDataset}
            handleDatasetSelection={handleDatasetSelection}
            loading={isLoading}
          />
          {selectedPrerpocessedDatasetName !== 'default' && (
            <div className='dataset-table-header-info'>
              <button className='preprocess-delete' onClick={handleDeleteDataset}>
                <MdDelete className='delete-icon' />
              </button>
            </div>
          )}
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
                  <col style={{ width: '44%' }} />
                  <col style={{ width: '39%' }} />
                  <col style={{ width: '12%' }} />
                </>
              ) : (
                <>
                  <col style={{ width: '4.5%' }} />
                  <col style={{ width: '39.5%' }} />
                  <col style={{ width: '35%' }} />
                  <col style={{ width: '11%' }} />
                  <col style={{ width: '10%' }} />
                </>
              )}
            </colgroup>
            <thead>
              <tr>
                <th>ID</th>
                <th>Original Content</th>
                <th>Preprocessed Content</th>
                <th>Topic</th>
                {preprocessedDatasetId === rawDatasetId ? '' : <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {dataset.length === 0 ? (
                <tr>
                  {preprocessedDatasetId === rawDatasetId ? (
                    <td colSpan='4' style={{ textAlign: 'center' }}>
                      No data available.
                    </td>
                  ) : (
                    <td colSpan='5' style={{ textAlign: 'center' }}>
                      No data available.
                    </td>
                  )}
                </tr>
              ) : (
                dataset.map((item) => (
                  <tr key={item.index}>
                    <td>
                      <p className='preprocessed-content-text index'>{item.index + 1}</p>
                    </td>
                    <td title={item.contentSnippet}>
                      <p className='preprocessed-content-text'>{item.contentSnippet}</p>
                    </td>
                    <td title={item.preprocessedContent}>
                      {editingIndex === item.index ? (
                        <textarea
                          ref={textareaRef}
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
                              {label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <p className='preprocessed-content-text index'>{item.topik}</p>
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
  handleDeleteDataset: PropTypes.func.isRequired,
};

export default PreprocessTable;
