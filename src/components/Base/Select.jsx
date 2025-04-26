// Select.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Select as StyledSelect } from '../styled/Dropdown';
import { GiWorld } from 'react-icons/gi';

const ModelSelect = ({ models, selectedModelId, handleModelChange, showFormattedDate }) => {
  return (
    <Dropdown className={`modelDropdown ${models.length === 0 ? 'disabled' : ''}`}>
      <div className='modelLogo'>
        <GiWorld />
      </div>
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

const DatasetSelect = ({ datasets, selectedDataset, handleDatasetSelection }) => {
  return (
    <div
      className={`dataset-select-container ${datasets.length === 0 && !selectedDataset ? 'disabled' : ''}`}
    >
      <select
        id='dataset-select'
        className='dataset-select'
        onChange={handleDatasetSelection}
        value={selectedDataset || ''}
        disabled={datasets.length === 0 && !selectedDataset}
      >
        {datasets.length === 0 && !selectedDataset ? (
          <option value=''>No datasets available</option>
        ) : (
          <>
            <option className='dataset-select-option' value='' disabled>
              Select a dataset
            </option>
            {datasets.map((dataset) => (
              <option className='dataset-select-option' key={dataset.id} value={dataset.id}>
                {dataset.name}
              </option>
            ))}
          </>
        )}
      </select>
    </div>
  );
};

const PreprocessedDatasetSelect = ({ datasets, selectedDataset, handleDatasetSelection }) => {
  return (
    <div
      className={`dataset-select-container ${datasets.length === 0 || !selectedDataset ? 'disabled' : ''}`}
    >
      <select
        id='dataset-select'
        className='dataset-select'
        onChange={handleDatasetSelection}
        value={selectedDataset || ''}
        disabled={datasets.length === 0 || !selectedDataset}
      >
        {datasets.length === 0 || !selectedDataset ? (
          <option value=''>No datasets available</option>
        ) : (
          <>
            <option className='dataset-select-option' value='' disabled>
              Select a dataset
            </option>
            {datasets.map((dataset) => (
              <option className='dataset-select-option' key={dataset.id} value={dataset.id}>
                {dataset.name}
              </option>
            ))}
          </>
        )}
      </select>
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
};
PreprocessedDatasetSelect.propTypes = {
  datasets: PropTypes.array.isRequired,
  selectedDataset: PropTypes.string,
  handleDatasetSelection: PropTypes.func.isRequired,
};

export { ModelSelect, DatasetSelect, PreprocessedDatasetSelect };
