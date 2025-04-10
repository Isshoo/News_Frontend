// src/pages/ParametersPage.jsx
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncFetchPreprocessedDatasetDetail } from '../states/preprocessedDatasetDetail/thunk';
import { asyncFetchModelDetail } from '../states/modelDetail/thunk';
import { asyncTrainModel } from '../states/models/thunk';
import { updateModelName } from '../states/modelDetail/action';
import { fetchParameters, updateParameter } from '../states/parameter/thunk';
import { updateNNeighbors } from '../states/parameter/action';

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
    setLoading(false);
    return response;
  };

  // Conditional rendering to prevent undefined props usage
  if (!selectedDataset || !selectedPreprocessedDataset || !selectedModelId) {
    return (
      <Pages>
        <h2>Processing</h2>
        <p>Mohon pilih dataset, preprocessed dataset, dan model terlebih dahulu.</p>
      </Pages>
    );
  }

  return (
    <Pages>
      <h2>Processing</h2>
      <DatasetInfo totalData={totalData || 0} topicCounts={topicCounts || {}} loading={loading} />
      <ParameterSelection
        nNeighbors={nNeighbors}
        splitSize={splitSize}
        trainSize={trainSize}
        testSize={testSize}
        trainPerTopic={trainPerTopic}
        testPerTopic={testPerTopic}
        handleSplitChange={handleSplitChange}
        handleNNeighborsChange={handleNNeighborsChange}
        loading={loading}
      />
      <label>
        Nama Model:
        <input type='text' value={name || ''} onChange={handleNameChange} disabled={loading} />
      </label>
      <TrainButton handleTrain={handleTrain} />
    </Pages>
  );
};

export default ParametersPage;
