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
    dispatch(setSelectedModel(id, model_path));
    dispatch(setSelectedDataset(raw_dataset_id));
    dispatch(setSelectedPreprocessedDataset(preprocessed_dataset_id));
    navigate('/admin/home/evaluation');
  };

  const handleClassify = () => {
    dispatch(setSelectedModel(id, model_path));
    dispatch(setSelectedDataset(raw_dataset_id));
    dispatch(setSelectedPreprocessedDataset(preprocessed_dataset_id));
    navigate('/user/home');
  };

  const handleEdit = async () => {
    if (newName.trim() && newName !== name) {
      await onRename(id, newName);
      dispatch(setSelectedModel(id, model_path));
      dispatch(setSelectedDataset(raw_dataset_id));
      dispatch(setSelectedPreprocessedDataset(preprocessed_dataset_id));
    }
    setIsEditing(false);
  };

  return (
    <div className='model-item'>
      <div className='model-header'>
        {id !== 'default-stemmed' && isEditing ? (
          <input
            className='model-edit-input'
            type='text'
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
            autoFocus
          />
        ) : (
          <h3 onClick={() => id !== 'default-stemmed' && setIsEditing(true)}>{name}</h3>
        )}
        <span className='model-date'>{new Date(updated_at).toLocaleString()}</span>
      </div>

      <div className='model-info'>
        <p>
          <strong>Accuracy:</strong> {accuracy.toFixed(2) * 100}%
        </p>
        <p>
          <strong>Total Data:</strong> {total_data}
        </p>
        <p>
          <strong>Split Size:</strong> {split_size}
        </p>
        <p>
          <strong>n_neighbors:</strong> {n_neighbors}
        </p>
        <p>
          <strong>Preprocessed Dataset:</strong> {preprocessed_dataset_id}
        </p>
        <p>
          <strong>Raw Dataset:</strong> {raw_dataset_id}
        </p>
        <p>
          <strong>Created:</strong> {new Date(created_at).toLocaleString()}
        </p>
      </div>

      <div className='model-actions'>
        <button className='detail-btn' onClick={handleDetail} disabled={isEditing}>
          Details
        </button>
        <button className='classify-btn' onClick={handleClassify} disabled={isEditing}>
          Use for Classification
        </button>
        {id !== 'default-stemmed' && (
          <button className='delete-btn' onClick={() => onDelete(id)}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

ModelItem.propTypes = {
  model: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onRename: PropTypes.func.isRequired,
};

export default ModelItem;
