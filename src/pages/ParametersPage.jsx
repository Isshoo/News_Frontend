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
import ParameterInfo from '../components/page-comps/Parameters-Page/parameterInfo';
import TrainButton from '../components/page-comps/Parameters-Page/TrainButton';
import ModelConfigForm from '../components/page-comps/Parameters-Page/ModelConfigForm';
import TopicSummaryTable from '../components/page-comps/Parameters-Page/TopicSummaryTable';

import Swal from 'sweetalert2';
import ModelSelect from '../components/Base/ModelSelect';
import Loading from '../components/Base/LoadingBar';

const ParametersPage = () => {
  const dispatch = useDispatch();
  const firstrun = useRef(true);

  const { selectedDataset } = useSelector((state) => state.datasets);
  const { selectedPreprocessedDataset, preprocessedDatasets } = useSelector(
    (state) => state.preprocessedDatasets
  );
  const { totalData, topicCounts } = useSelector((state) => state.preprocessedDatasetDetail);
  const { selectedModelId, trainLoading } = useSelector((state) => state.models);
  const { name } = useSelector((state) => state.modelDetail);
  const {
    nNeighbors = 0,
    splitSize = 0,
    trainSize = 0,
    testSize = 0,
    trainPerTopic = {},
    testPerTopic = {},
  } = useSelector((state) => state.parameter);

  const [isLoading, setIsLoading] = React.useState(true);
  const noDataset = !selectedDataset || !selectedPreprocessedDataset;

  useEffect(() => {
    if (firstrun.current) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      firstrun.current = false;
      return;
    }
    if (selectedModelId && selectedPreprocessedDataset) {
      const loadData = async () => {
        await dispatch(asyncFetchPreprocessedDatasetDetail(selectedPreprocessedDataset));
        await dispatch(asyncFetchModelDetail(selectedModelId));
        await dispatch(fetchParameters(selectedModelId));
      };
      loadData();
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return;
    }
    if (preprocessedDatasets.length > 0 && selectedPreprocessedDataset) {
      const loadData = async () => {
        dispatch(resetParameter());
        dispatch(resetModelDetail());
        await dispatch(asyncFetchPreprocessedDatasetDetail(selectedPreprocessedDataset));
      };
      loadData();
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return;
    }
    dispatch(resetPreprocessedDatasetDetail());
    dispatch(resetModelDetail());
    dispatch(resetParameter());
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [selectedModelId, selectedPreprocessedDataset, preprocessedDatasets.length, dispatch]);

  const handleSplitChange = async (newSplitSize) => {
    dispatch(setSelectedModel('', ''));
    if (selectedDataset && selectedPreprocessedDataset) {
      dispatch(asyncFetchPreprocessedDatasetDetail(selectedPreprocessedDataset));
      dispatch(updateParameter(selectedDataset, selectedPreprocessedDataset, newSplitSize));
    }
  };

  const handleNNeighborsChange = (newNNeighbors) => {
    dispatch(setSelectedModel('', ''));
    if (selectedDataset && selectedPreprocessedDataset) {
      dispatch(asyncFetchPreprocessedDatasetDetail(selectedPreprocessedDataset));
      dispatch(updateNNeighbors(newNNeighbors));
    }
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    dispatch(setSelectedModel('', ''));
    if (selectedDataset && selectedPreprocessedDataset) {
      dispatch(asyncFetchPreprocessedDatasetDetail(selectedPreprocessedDataset));
      dispatch(updateModelName(newName));
    }
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
    await dispatch(
      asyncTrainModel(selectedDataset, selectedPreprocessedDataset, name, splitSize, nNeighbors)
    );
  };

  return (
    <Pages>
      {isLoading && <Loading page='admin-home' />}
      <div className='parameters-page'>
        <div className='dataset-table-header'>
          <div className='dataset-select-upload'>
            <h2>Parameters:</h2>
            <ModelSelect />
          </div>
          <div className='dataset-table-header-info'></div>
        </div>
        <div className='parameters-container-section'>
          <div className='parameters-upper'>
            <div className='parameters-upper-left'>
              <div className='form-section'>
                <ParameterInfo totalData={totalData || 0} topicCounts={topicCounts || {}} />
              </div>
            </div>

            <div className='parameters-upper-right'>
              <div className='form-section'>
                <TopicSummaryTable
                  trainSize={trainSize}
                  testSize={testSize}
                  trainPerTopic={trainPerTopic}
                  testPerTopic={testPerTopic}
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
                <TrainButton
                  handleTrain={handleTrain}
                  noDataset={noDataset}
                  trainLoading={trainLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Pages>
  );
};

export default ParametersPage;
