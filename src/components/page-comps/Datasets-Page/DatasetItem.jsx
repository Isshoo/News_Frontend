import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { setSelectedModel } from '../../../states/models/action';
import { setSelectedDataset } from '../../../states/datasets/action';
import { setSelectedPreprocessedDataset } from '../../../states/preprocessedDatasets/action';

const DatasetItem = ({ dataset, onDelete }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, name, total_data, topic_counts, upload_at } = dataset;

  const handleTrain = () => {
    dispatch(setSelectedDataset(id));
    dispatch(setSelectedPreprocessedDataset(''));
    dispatch(setSelectedModel('', ''));
    navigate('/train-model/preprocessing');
  };

  return (
    <div className='dataset-item'>
      <h3>{name}</h3>
      <p>
        <strong>Total Data:</strong> {total_data}
      </p>
      <p>
        <strong>Topic Counts:</strong>
      </p>
      <ul>
        {Object.entries(topic_counts).map(([topic, count]) => (
          <li key={topic}>
            {topic}: {count}
          </li>
        ))}
      </ul>
      <p>
        <strong>Uploaded At:</strong> {new Date(upload_at).toLocaleString()}
      </p>
      <button onClick={handleTrain} className='train-btn'>
        Train
      </button>
      {id != 'default-stemming' ? (
        <button onClick={() => onDelete(id)} className='delete-btn'>
          Delete
        </button>
      ) : (
        ''
      )}
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
};

export default DatasetItem;
