import React from 'react';
import PropTypes from 'prop-types';
import DatasetInfo from './DatasetInfo';

const PopupModalInfo = ({ onClose, totalData, topicCounts, datasets, selectedDataset }) => {
  const dataset = datasets.find((dataset) => dataset.id === selectedDataset);
  const datasetName = dataset ? dataset.name : 'N/A';
  const uploadedAt = dataset ? new Date(dataset.upload_at).toLocaleString() : 'N/A';
  return (
    <div className='popup-overlay-dataset-info'>
      <div className='popup-modal-dataset-info'>
        <button className='popup-close-dataset-info' onClick={onClose}>
          &times;
        </button>
        <h2>Dataset Information</h2>
        <p className='data-info'>
          <strong>Dataset Name:</strong> {datasetName}
        </p>
        <p className='data-info'>
          <strong>Uploaded At:</strong> {uploadedAt}
        </p>
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
  selectedDataset: PropTypes.string.isRequired,
};

export default PopupModalInfo;
