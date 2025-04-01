import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ModelItem = ({ model, onDelete, onRename }) => {
  const navigate = useNavigate();
  const {
    id,
    name,
    preprocessed_dataset_id,
    raw_dataset_id,
    total_data,
    n_neighbors,
    split_size,
    created_at,
    updated_at,
    evaluation,
  } = model;

  const [newName, setNewName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setNewName(name);
  }, [name]);

  const handleDetail = () => {
    localStorage.setItem('modelId', id);
    localStorage.setItem('selectedDataset', raw_dataset_id);
    localStorage.setItem('preprocessed_dataset_id', preprocessed_dataset_id);
    navigate('/train-model/evaluation');
  };

  const handleClassify = () => {
    localStorage.setItem('classifierModel', id);
    navigate('/');
  };

  const handleEdit = async () => {
    if (newName.trim() && newName !== name) {
      await onRename(id, newName);
    }
    setIsEditing(false);
  };

  return (
    <div className='model-item'>
      {isEditing ? (
        <input
          type='text'
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
          autoFocus
        />
      ) : (
        <h3 onClick={() => setIsEditing(true)}>{name}</h3>
      )}
      <p>
        <strong>Preprocessed Dataset:</strong> {preprocessed_dataset_id}
      </p>
      <p>
        <strong>Raw Dataset:</strong> {raw_dataset_id}
      </p>
      <p>
        <strong>Total Data:</strong> {total_data}
      </p>
      <p>
        <strong>n_neighbors:</strong> {n_neighbors}
      </p>
      <p>
        <strong>Split Size:</strong> {split_size}
      </p>
      <p>
        <strong>Created At:</strong> {new Date(created_at).toLocaleString()}
      </p>
      <p>
        <strong>Updated At:</strong> {new Date(updated_at).toLocaleString()}
      </p>
      <p>
        <strong>Accuracy:</strong> {evaluation.accuracy.toFixed(2)}%
      </p>
      <button onClick={handleDetail} className='detail-btn'>
        Details
      </button>
      <button onClick={handleClassify} className='classify-btn'>
        Use for Classification
      </button>
      <button onClick={() => onDelete(id)} className='delete-btn'>
        Delete
      </button>
    </div>
  );
};

ModelItem.propTypes = {
  model: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onRename: PropTypes.func.isRequired,
};

export default ModelItem;
