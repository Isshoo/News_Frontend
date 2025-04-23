import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { setSelectedModel } from '../../../states/models/action';
import { setSelectedDataset } from '../../../states/datasets/action';
import { setSelectedPreprocessedDataset } from '../../../states/preprocessedDatasets/action';
import { mapSplitResult } from '../../../utils/helper';

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

  const { datasets } = useSelector((state) => state.datasets);
  const { allPreprocessedDatasets } = useSelector((state) => state.preprocessedDatasets);

  const dataset = datasets.find((dataset) => dataset.id === raw_dataset_id);
  const preprocessedDataset = allPreprocessedDatasets.find(
    (dataset) => dataset.id === preprocessed_dataset_id
  );

  const rawDatasetName = dataset ? dataset.name : 'N/A';
  const preprocessedDatasetName = preprocessedDataset ? preprocessedDataset.name : 'N/A';

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
    <div className='model-card'>
      <div className='model-header'>
        <div className='model-title-group'>
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
            <h3
              className='model-title'
              onClick={() => id !== 'default-stemmed' && setIsEditing(true)}
            >
              {name}
            </h3>
          )}
          <p className='model-date'>Updated on {new Date(updated_at).toLocaleDateString()}</p>
        </div>
        <div className='model-accuracy'>{accuracy.toFixed(2) * 100}%</div>
      </div>

      <div className='model-body'>
        <div className='model-section'>
          <p className='model-section-title'>Parameters</p>
          <div className='model-section-details'>
            <div>
              <p className='model-sub-title'>Split Size</p>
              <p>: {mapSplitResult(split_size)}</p>
            </div>
            <div>
              <p className='model-sub-title'>n_neighbors</p>
              <p>: {n_neighbors}</p>
            </div>
          </div>
        </div>
        <div className='model-section'>
          <p className='model-section-title'>Datasets</p>
          <div className='model-section-details'>
            <div>
              <p className='model-sub-title'>Raw</p>
              <p>: {rawDatasetName}</p>
            </div>
            <div>
              <p className='model-sub-title'>Preprocessed</p>
              <p>: {preprocessedDatasetName}</p>
            </div>
          </div>
        </div>
        <p className='model-created'>Created on {new Date(created_at).toLocaleDateString()}</p>
      </div>

      <div className='model-footer'>
        {id !== 'default-stemmed' && (
          <button className='btn-delete' onClick={() => onDelete(id)}>
            Delete
          </button>
        )}
        <button className='btn-detail' onClick={handleDetail} disabled={isEditing}>
          Details
        </button>
        <button className='btn-classify' onClick={handleClassify} disabled={isEditing}>
          Classify
        </button>
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
