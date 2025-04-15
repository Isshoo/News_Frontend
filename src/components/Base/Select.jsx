// Select.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Select as StyledSelect } from '../styled/Dropdown'; // pastikan file style bernama SelectStyles.js atau sesuaikan

const ModelSelect = ({ models, selectedModelId, handleModelChange, showFormattedDate }) => {
  return (
    <Dropdown className='modelDropdown'>
      <StyledSelect
        className='modelSelect'
        value={selectedModelId || ''}
        onChange={handleModelChange}
        disabled={models.length === 0}
      >
        {models.length === 0 ? (
          <option value=''>Default</option>
        ) : (
          <>
            {models.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name} (Created: {showFormattedDate(model.created_at)})
              </option>
            ))}
          </>
        )}
      </StyledSelect>
    </Dropdown>
  );
};

const DatasetSelect = ({ datasets, selectedDataset, handleDatasetSelection, loading }) => {
  return (
    <div className='dataset-select-container'>
      <label className='dataset-select-label' htmlFor='dataset-select'>
        Choose Dataset
      </label>
      <select
        id='dataset-select'
        className='dataset-select'
        onChange={handleDatasetSelection}
        value={selectedDataset || ''}
        disabled={loading || datasets.length === 0}
      >
        {loading ? (
          <option value='' disabled>
            Loading datasets...
          </option>
        ) : datasets.length === 0 ? (
          <option value=''>No datasets available</option>
        ) : (
          <>
            <option value='' disabled>
              Select a dataset
            </option>
            {datasets.map((dataset) => (
              <option key={dataset.id} value={dataset.id}>
                {dataset.name}
              </option>
            ))}
          </>
        )}
      </select>
    </div>
  );
};

const ListDataset = ({
  preprocessedDatasets,
  rawDatasetId,
  handleDatasetSelection,
  handleDeleteDataset,
}) => {
  return (
    <div className='list-dataset-wrapper'>
      {preprocessedDatasets.length > 0 ? (
        preprocessedDatasets.map((ds) => (
          <div className='list-dataset-item' key={ds.id}>
            <button className='list-dataset-select' onClick={() => handleDatasetSelection(ds.id)}>
              {ds.name}
            </button>
            {ds.id !== rawDatasetId && (
              <button className='list-dataset-delete' onClick={() => handleDeleteDataset(ds.id)}>
                ✕
              </button>
            )}
          </div>
        ))
      ) : (
        <p className='list-dataset-empty'>No preprocessed datasets found.</p>
      )}
    </div>
  );
};

ModelSelect.propTypes = {
  models: PropTypes.array.isRequired,
  selectedModelId: PropTypes.string.isRequired,
  handleModelChange: PropTypes.func.isRequired,
  showFormattedDate: PropTypes.func.isRequired,
};
DatasetSelect.propTypes = {
  datasets: PropTypes.array.isRequired,
  selectedDataset: PropTypes.string,
  handleDatasetSelection: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
ListDataset.propTypes = {
  preprocessedDatasets: PropTypes.array.isRequired,
  rawDatasetId: PropTypes.string.isRequired,
  handleDatasetSelection: PropTypes.func.isRequired,
  handleDeleteDataset: PropTypes.func.isRequired,
};

export { ModelSelect, DatasetSelect, ListDataset };
