import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { setSelectedModel } from '../../../states/models/action';
import { setSelectedDataset } from '../../../states/datasets/action';
import { setSelectedPreprocessedDataset } from '../../../states/preprocessedDatasets/action';
import { mapLabelResult } from '../../../utils/helper';

const DatasetItem = ({ dataset, onDelete, deletingId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, name, total_data, topic_counts, upload_at, updated_at } = dataset;

  const topic_counts_template = {
    ekonomi: 0,
    gayahidup: 0,
    hiburan: 0,
    olahraga: 0,
    teknologi: 0,
  };

  const handleTrain = async () => {
    dispatch(setSelectedDataset(id));
    dispatch(setSelectedPreprocessedDataset(id));
    dispatch(setSelectedModel('', ''));
    navigate('/admin/home/data-collecting');
  };

  return (
    <div className='dataset-card'>
      <div className='dataset-header'>
        <div>
          <h3 className='dataset-title'>{name}</h3>
          <p className='dataset-date'>
            {id === 'default' ? 'Created on ' : 'Uploaded on '}
            {new Date(upload_at).toLocaleDateString()}
          </p>
        </div>
        <div className='dataset-count'>{total_data} entries</div>
      </div>

      <div className='dataset-body'>
        {Object.keys(topic_counts).length === 0 ? (
          <div className='dataset-topics'>
            {Object.entries(topic_counts_template).map(([topic, count]) => (
              <div key={topic} className='topic-badge'>
                <span className='topic-name'>{mapLabelResult(topic)}</span>
                <span className='topic-count'>{count}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className='dataset-topics'>
            {Object.entries(topic_counts).map(([topic, count]) => (
              <div key={topic} className='topic-badge'>
                <span className='topic-name'>{mapLabelResult(topic)}</span>
                <span className='topic-count'>{count}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {id === 'default' && (
        <p className='dataset-update'>Updated at {new Date(updated_at).toLocaleDateString()}</p>
      )}

      <div className='dataset-footer'>
        {id !== 'default' ? (
          <button className='btn-delete' onClick={() => onDelete(id)} disabled={deletingId === id}>
            {deletingId === id ? 'Deleting...' : 'Delete'}
          </button>
        ) : (
          <button className='btn-train' onClick={handleTrain}>
            Train
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
    updated_at: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  deletingId: PropTypes.string,
};

export default DatasetItem;
