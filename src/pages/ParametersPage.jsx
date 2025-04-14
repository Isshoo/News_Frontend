// src/pages/ParametersPage.jsx
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncFetchPreprocessedDatasetDetail } from '../states/preprocessedDatasetDetail/thunk';
import { resetPreprocessedDatasetDetail } from '../states/preprocessedDatasetDetail/action';
import { asyncFetchModelDetail } from '../states/modelDetail/thunk';
import { asyncTrainModel } from '../states/models/thunk';
import { updateModelName, resetModelDetail } from '../states/modelDetail/action';
import { fetchParameters, updateParameter } from '../states/parameter/thunk';
import { updateNNeighbors, resetParameter } from '../states/parameter/action';

import { setSelectedModel } from '../states/models/action';

import Pages from '../components/styled/Pages';
import DatasetInfo from '../components/page-comps/DataCollecting-Page/DatasetInfo';
import ParameterSelection from '../components/page-comps/Parameters-Page/ParameterSelection';
import TrainButton from '../components/page-comps/Parameters-Page/TrainButton';

const ParametersPage = () => {
  const dispatch = useDispatch();
  const firstRun = useRef(true);

  const { selectedDataset } = useSelector((state) => state.datasets);
  const { selectedPreprocessedDataset } = useSelector((state) => state.preprocessedDatasets);
  const { totalData, topicCounts } = useSelector((state) => state.preprocessedDatasetDetail);
  const { selectedModelId } = useSelector((state) => state.models);
  const { name } = useSelector((state) => state.modelDetail);
  const {
    nNeighbors = 0,
    splitSize = 0,
    trainSize = 0,
    testSize = 0,
    trainPerTopic = {},
    testPerTopic = {},
  } = useSelector((state) => state.parameter);

  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }

    dispatch(resetPreprocessedDatasetDetail());
    dispatch(resetModelDetail());
    dispatch(resetParameter());

    if (selectedModelId) {
      dispatch(asyncFetchModelDetail(selectedModelId));
      dispatch(fetchParameters(selectedModelId));
    }

    if (selectedPreprocessedDataset) {
      dispatch(asyncFetchPreprocessedDatasetDetail(selectedPreprocessedDataset));
    }
  }, [selectedModelId, selectedPreprocessedDataset, dispatch]);

  const handleSplitChange = async (newSplitSize) => {
    if (selectedDataset && selectedPreprocessedDataset) {
      dispatch(updateParameter(selectedDataset, selectedPreprocessedDataset, newSplitSize));
    }
  };

  const handleNNeighborsChange = (newNNeighbors) => {
    dispatch(updateNNeighbors(newNNeighbors));
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    dispatch(updateModelName(newName));
  };

  const handleTrain = async () => {
    setLoading(true);
    const response = await dispatch(
      asyncTrainModel(selectedDataset, selectedPreprocessedDataset, name, splitSize, nNeighbors)
    );
    console.log(response);
    dispatch(setSelectedModel(response.id, response.model_path));
    setLoading(false);
    return response;
  };

  // Conditional rendering to prevent undefined props usage
  if (!selectedDataset || !selectedPreprocessedDataset) {
    return (
      <Pages>
        <h2>Processing</h2>
        <p>Mohon pilih dataset, preprocessed dataset, dan model terlebih dahulu.</p>
      </Pages>
    );
  }

  return (
    <Pages>
      <h2 className='section-title'>Processing</h2>

      <div className='form-section'>
        <h3 className='section-subtitle'>Dataset Information</h3>
        <DatasetInfo totalData={totalData || 0} topicCounts={topicCounts || {}} loading={loading} />
      </div>

      <div className='form-section'>
        <h3 className='section-subtitle'>Set Training Parameters</h3>

        <div className='form-group'>
          <label>Train-Test Split</label>
          <select
            value={splitSize}
            onChange={(e) => handleSplitChange(Number(e.target.value))}
            disabled={loading}
          >
            <option value={0} disabled>
              Select Split Size
            </option>
            <option value={0.5}>50-50</option>
            <option value={0.4}>60-40</option>
            <option value={0.3}>70-30</option>
            <option value={0.25}>75-25</option>
            <option value={0.2}>80-20</option>
          </select>
        </div>

        <div className='summary-section'>
          <div className='summary-box'>
            <p>
              <strong>Train Data:</strong> {trainSize}
            </p>
            <p>Train Per Topic:</p>
            <ul>
              {Object.entries(trainPerTopic || {}).map(([topic, counts]) => (
                <li key={topic}>
                  {topic}: {counts}
                </li>
              ))}
            </ul>
          </div>
          <div className='summary-box'>
            <p>
              <strong>Test Data:</strong> {testSize}
            </p>
            <p>Test Per Topic:</p>
            <ul>
              {Object.entries(testPerTopic || {}).map(([topic, counts]) => (
                <li key={topic}>
                  {topic}: {counts}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='form-group'>
          <label>n_neighbors</label>
          <input
            type='number'
            value={nNeighbors}
            onChange={(e) => handleNNeighborsChange(Number(e.target.value))}
            min='1'
          />
        </div>
      </div>

      <div className='form-section'>
        <h3 className='section-subtitle'>Model Configuration</h3>
        <div className='form-group'>
          <label>Nama Model</label>
          <input
            type='text'
            value={name || ''}
            onChange={handleNameChange}
            disabled={loading}
            placeholder='Masukkan nama model'
          />
        </div>
      </div>

      <div className='form-section center'>
        <TrainButton handleTrain={handleTrain} />
      </div>
    </Pages>
  );
};

export default ParametersPage;
