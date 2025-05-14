import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Loading from '../../Base/LoadingBar';
import { MdInfoOutline, MdDelete } from 'react-icons/md';
import { PreprocessedDatasetSelect } from '../../Base/Select';
import { mapLabelResult } from '../../../utils/helper';

const PreprocessTable = ({
  data,
  allPreprocessedDatasets,
  selectedPreprocessedDataset,
  editingIndex,
  newLabel,
  setNewLabel,
  newPreprocessedContent,
  setNewPreprocessedContent,
  handleEdit,
  handleSave,
  handleDelete,
  filter,
  handleFilterSelection,
  totalData,
  setShowInfo,
  renderNoPreprocessedDataset,
  fullStats,
}) => {
  const labelOptions = ['ekonomi', 'gayahidup', 'hiburan', 'olahraga', 'teknologi'];
  const filters = ['new', 'old'];
  const textareaRef = useRef();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [newPreprocessedContent]);

  return (
    <div className='preprocess-table'>
      <div className='dataset-table-header'>
        <div className='dataset-select-upload'>
          <h2>Preprocessed Dataset:</h2>

          <PreprocessedDatasetSelect
            datasets={filters}
            selectedDataset={filter}
            handleDatasetSelection={handleFilterSelection}
          />
        </div>

        <div className='dataset-table-header-info'>
          <p>
            <strong>Total Data: {totalData || 0}</strong>
          </p>
          {!selectedPreprocessedDataset ||
            (allPreprocessedDatasets.length > 0 && (
              <button onClick={() => setShowInfo(true)}>
                <MdInfoOutline className='info-icon' />
              </button>
            ))}
        </div>
      </div>
      <div className='preprocess-table-container'>
        {filter === 'new' && fullStats.total_unprocessed > 0 ? (
          renderNoPreprocessedDataset()
        ) : (
          <table>
            <colgroup>
              {filter === 'old' ? (
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
                {filter !== 'old' && <th>Actions</th>}
              </tr>
            </thead>

            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan={filter === 'old' ? 4 : 5}
                    style={{ textAlign: 'center', fonstStyle: 'italic' }}
                  >
                    No data available, please add a new data from Collecting Page.
                  </td>
                </tr>
              ) : (
                <>
                  {data.map((item) => {
                    const isEditing = editingIndex === item.index;

                    return (
                      <tr key={item.index}>
                        <td className='numbering'>
                          <p className='preprocessed-content-text index'>{item.index + 1}</p>
                        </td>

                        <td title={item.contentSnippet}>
                          <p className='preprocessed-content-text'>{item.contentSnippet}</p>
                        </td>

                        <td title={item.preprocessedContent}>
                          {isEditing ? (
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

                        <td className='center-text'>
                          {isEditing ? (
                            <select
                              className='preprocessed-content-select'
                              value={newLabel}
                              onChange={(e) => setNewLabel(e.target.value)}
                            >
                              {labelOptions.map((label) => (
                                <option key={label} value={label}>
                                  {mapLabelResult(label)}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <p className='preprocessed-content-text index center-text'>
                              {mapLabelResult(item.topik)}
                            </p>
                          )}
                        </td>

                        {filter !== 'old' && (
                          <td className='actions-cell'>
                            {isEditing ? (
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
                    );
                  })}
                </>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

PreprocessTable.propTypes = {
  data: PropTypes.array.isRequired,
  selectedPreprocessedDataset: PropTypes.string,
  allPreprocessedDatasets: PropTypes.array.isRequired,
  editingIndex: PropTypes.number,
  newLabel: PropTypes.string,
  setNewLabel: PropTypes.func,
  newPreprocessedContent: PropTypes.string,
  setNewPreprocessedContent: PropTypes.func,
  handleEdit: PropTypes.func,
  handleSave: PropTypes.func,
  handleDelete: PropTypes.func,
  filter: PropTypes.string,
  handleFilterSelection: PropTypes.func.isRequired,
  totalData: PropTypes.number.isRequired,
  setShowInfo: PropTypes.func.isRequired,
  renderNoPreprocessedDataset: PropTypes.func.isRequired,
  fullStats: PropTypes.object.isRequired,
};

export default PreprocessTable;
