import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const DatasetItem = ({ dataset, onDelete }) => {
  const navigate = useNavigate();
  const { id, name, total_data, topic_counts, upload_at } = dataset;

  const handleTrain = () => {
    localStorage.setItem('selectedDataset', id);
    localStorage.removeItem('preprocessed_dataset_id');
    localStorage.removeItem('modelId');
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
