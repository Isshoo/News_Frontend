import React from 'react';
import PropTypes from 'prop-types';
import DatasetInfo from './DatasetInfo';

const PopupModalInfo = ({
  onClose,
  totalData,
  topicCounts,
  datasets,
  preprocessedDatasets,
  selectedDataset,
}) => {
  const preprocessedDataset = preprocessedDatasets.find(
    (dataset) => dataset.id === selectedDataset
  );
  const preprocessedDatasetName = preprocessedDataset ? preprocessedDataset.name : 'N/A';
  const rawDatasetId = preprocessedDataset ? preprocessedDataset.raw_dataset_id : 'N/A';
  const rawDatasetName = datasets.find((dataset) => dataset.id === rawDatasetId)?.name || 'N/A';
  const createdAt = preprocessedDataset
    ? new Date(preprocessedDataset.created_at).toLocaleString()
    : 'N/A';
  const updatedAt = preprocessedDataset
    ? new Date(preprocessedDataset.updated_at).toLocaleString()
    : 'N/A';
  return (
    <div className='popup-overlay-dataset-info'>
      <div className='popup-modal-dataset-info'>
        <button className='popup-close-dataset-info' onClick={onClose}>
          &times;
        </button>
        <h2>Dataset Information</h2>
        <p className='data-info'>
          <strong>Preprocessed Dataset Name:</strong> {preprocessedDatasetName}
        </p>
        <p className='data-info'>
          <strong>Raw Dataset Name:</strong> {rawDatasetName}
        </p>
        <p className='data-info'>
          <strong>Created At:</strong> {createdAt}
        </p>
        {preprocessedDatasetName !== 'default' && (
          <p className='data-info'>
            <strong>Updated At:</strong> {updatedAt}
          </p>
        )}

        <p className='data-info'>
          <strong>Total Data:</strong> {totalData}
        </p>
        <DatasetInfo topicCounts={topicCounts} totalData={totalData} />
      </div>
    </div>
  );
};

PopupModalInfo.propTypes = {
  onClose: PropTypes.func.isRequired,
  totalData: PropTypes.number.isRequired,
  topicCounts: PropTypes.object.isRequired,
  datasets: PropTypes.array.isRequired,
  preprocessedDatasets: PropTypes.array.isRequired,
  selectedDataset: PropTypes.string.isRequired,
};

export default PopupModalInfo;
