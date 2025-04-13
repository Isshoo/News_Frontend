import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { setSelectedModel } from '../../../states/models/action';
import { setSelectedDataset } from '../../../states/datasets/action';
import { setSelectedPreprocessedDataset } from '../../../states/preprocessedDatasets/action';

const ModelItem = ({ model, onDelete, onRename }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    id,
    name,
    model_path,
    preprocessed_dataset_id,
    raw_dataset_id,
    total_data,
    n_neighbors,
    split_size,
    created_at,
    updated_at,
    accuracy,
  } = model;

  const [newName, setNewName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setNewName(name);
  }, [name]);

  const handleDetail = () => {
    dispatch(setSelectedModel({ id, path: model_path }));
    dispatch(setSelectedDataset(raw_dataset_id));
    dispatch(setSelectedPreprocessedDataset(preprocessed_dataset_id));
    navigate('/train-model/evaluation');
  };

  const handleClassify = () => {
    dispatch(setSelectedModel({ id, path: model_path }));
    dispatch(setSelectedDataset(raw_dataset_id));
    dispatch(setSelectedPreprocessedDataset(preprocessed_dataset_id));
    navigate('/');
  };

  const handleEdit = async () => {
    if (newName.trim() && newName !== name) {
      await onRename(id, newName);
      dispatch(setSelectedModel({ id, path: model_path }));
      dispatch(setSelectedDataset(raw_dataset_id));
      dispatch(setSelectedPreprocessedDataset(preprocessed_dataset_id));
    }
    setIsEditing(false);
  };

  return (
    <div className='model-item'>
      {id !== 'default-stemmed' ? (
        isEditing ? (
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
        )
      ) : (
        <h3>{name}</h3>
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
        <strong>Accuracy:</strong> {(accuracy * 100).toFixed(2)}%
      </p>

      <button onClick={handleDetail} className='detail-btn' disabled={isEditing}>
        Details
      </button>
      <button onClick={handleClassify} className='classify-btn' disabled={isEditing}>
        Use for Classification
      </button>
      {id !== 'default-stemmed' && (
        <button onClick={() => onDelete(id)} className='delete-btn'>
          Delete
        </button>
      )}
    </div>
  );
};

ModelItem.propTypes = {
  model: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onRename: PropTypes.func.isRequired,
};

export default ModelItem;
