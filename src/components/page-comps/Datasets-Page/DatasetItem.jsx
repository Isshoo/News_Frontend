import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { setSelectedModel } from '../../../states/models/action';
import { setSelectedDataset } from '../../../states/datasets/action';
import { setSelectedPreprocessedDataset } from '../../../states/preprocessedDatasets/action';

const DatasetItem = ({ dataset, onDelete, deletingId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, name, total_data, topic_counts, upload_at } = dataset;

  const handleTrain = () => {
    dispatch(setSelectedDataset(id));
    dispatch(setSelectedPreprocessedDataset(id));
    dispatch(setSelectedModel('', ''));
    navigate('/admin/home/preprocessing');
  };

  return (
    <div className='dataset-item'>
      <div className='dataset-item-header'>
        <h3>{name}</h3>
        <p className='dataset-uploaded'>Uploaded: {new Date(upload_at).toLocaleString()}</p>
      </div>
      <div className='dataset-item-body'>
        <p>
          <strong>Total Data:</strong> {total_data}
        </p>
        <div className='dataset-topic-counts'>
          <strong>Topic Counts:</strong>
          <ul>
            {Object.entries(topic_counts).map(([topic, count]) => (
              <li key={topic}>
                {topic}: {count}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='dataset-item-actions'>
        <button className='train-btn' onClick={handleTrain}>
          Train
        </button>
        {id !== 'default-stemming' && (
          <button className='delete-btn' onClick={() => onDelete(id)} disabled={deletingId === id}>
            {deletingId === id ? 'Deleting...' : 'Delete'}
          </button>
        )}
      </div>
    </div>
  );
};

DatasetItem.propTypes = {
  dataset: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    total_data: PropTypes.number.isRequired,
    topic_counts: PropTypes.object.isRequired,
    upload_at: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  deletingId: PropTypes.string,
};

export default DatasetItem;
