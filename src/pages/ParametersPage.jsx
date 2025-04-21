// src/pages/ParametersPage.jsx
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncFetchPreprocessedDatasetDetail } from '../states/preprocessedDatasetDetail/thunk';
import { asyncFetchModelDetail } from '../states/modelDetail/thunk';
import { asyncTrainModel } from '../states/models/thunk';
import { updateModelName } from '../states/modelDetail/action';
import { fetchParameters, updateParameter } from '../states/parameter/thunk';
import { updateNNeighbors } from '../states/parameter/action';

import { setSelectedModel } from '../states/models/action';

import Pages from '../components/styled/Pages';
import ParameterInfo from '../components/page-comps/Parameters-Page/parameterInfo';
import TrainButton from '../components/page-comps/Parameters-Page/TrainButton';
import ModelConfigForm from '../components/page-comps/Parameters-Page/ModelConfigForm';
import TopicSummaryTable from '../components/page-comps/Parameters-Page/TopicSummaryTable';

import Swal from 'sweetalert2';

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
  const noDataset = !selectedDataset || !selectedPreprocessedDataset;

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
    if (!name || !splitSize || !nNeighbors) {
      Swal.fire({
        icon: 'info',
        text: 'Please input all parameters before training!',
        timer: 2500,
        showConfirmButton: false,
      });
      return;
    }
    const response = await dispatch(
      asyncTrainModel(selectedDataset, selectedPreprocessedDataset, name, splitSize, nNeighbors)
    );
    if (!response?.canceled) {
      setLoading(true);
      dispatch(setSelectedModel(response.id, response.model_path));
    }
    setLoading(false);
    return response;
  };

  return (
    <Pages>
      <div className='parameters-page'>
        <div className='parameters-header'>
          <h2 className='parameters-title'>Parameters</h2>
          <p style={{ color: 'transparent' }}>.</p>
        </div>
        <div className='parameters-container-section'>
          <div className='parameters-upper'>
            <div className='parameters-upper-left'>
              <div className='form-section'>
                <ParameterInfo
                  totalData={totalData || 0}
                  topicCounts={topicCounts || {}}
                  loading={loading}
                />
              </div>
            </div>

            <div className='parameters-upper-right'>
              <div className='form-section'>
                <TopicSummaryTable
                  trainSize={trainSize}
                  testSize={testSize}
                  trainPerTopic={trainPerTopic}
                  testPerTopic={testPerTopic}
                  loading={loading}
                  splitSize={splitSize}
                  handleSplitChange={handleSplitChange}
                  noDataset={noDataset}
                />
              </div>
            </div>
          </div>
          <div className='parameters-lower'>
            <div className='parameters-lower-left'>
              <div className='form-section lower-left'>
                <h3 className='section-subtitle'>
                  <span>Model Configuration:</span>
                </h3>
                <ModelConfigForm
                  name={name}
                  onChange={handleNameChange}
                  loading={loading}
                  nNeighbors={nNeighbors}
                  handleNNeighborsChange={handleNNeighborsChange}
                />
              </div>
            </div>

            <div className='parameters-lower-right'>
              <div className='form-section lower-left'>
                <h3 className='section-subtitle'>
                  <span>Train Model:</span>
                </h3>
                <TrainButton handleTrain={handleTrain} noDataset={noDataset} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Pages>
  );
};

export default ParametersPage;
