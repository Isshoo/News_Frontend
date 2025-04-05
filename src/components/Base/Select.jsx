// Select.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Select as StyledSelect } from '../styled/Dropdown'; // pastikan file style bernama SelectStyles.js atau sesuaikan

const ModelSelect = ({ models, selectedModelId, handleModelChange, showFormattedDate }) => {
  return (
    <Dropdown>
      <StyledSelect
        value={selectedModelId || ''}
        onChange={handleModelChange}
        disabled={models.length === 0}
      >
        {models.length === 0 ? (
          <option value='default-stemmed'>Default</option>
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
    <Dropdown>
      <StyledSelect
        onChange={handleDatasetSelection}
        value={selectedDataset || ''}
        disabled={datasets.length === 0}
      >
        {loading ? (
          <option value='' disabled>
            Loading datasets...
          </option>
        ) : (
          <>
            {datasets.length === 0 ? (
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
          </>
        )}
      </StyledSelect>
    </Dropdown>
  );
};

const ListDataset = ({
  preprocessedDatasets,
  rawDatasetId,
  handleDatasetSelection,
  handleDeleteDataset,
}) => {
  return (
    <ul>
      {preprocessedDatasets.length > 0 ? (
        preprocessedDatasets.map((ds) => (
          <li key={ds.id}>
            <button onClick={() => handleDatasetSelection(ds.id)}>{ds.name}</button>
            {ds.id !== rawDatasetId && (
              <button onClick={() => handleDeleteDataset(ds.id)}>Delete</button>
            )}
          </li>
        ))
      ) : (
        <li>No preprocessed datasets found.</li>
      )}
    </ul>
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
