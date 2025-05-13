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
import { asyncFetchAllPreprocessedDatasets } from '../states/preprocessedDatasets/thunk';
import { setSelectedPreprocessedDataset } from '../states/preprocessedDatasets/action';

const ParametersPage = () => {
  const dispatch = useDispatch();
  const firstrun = useRef(true);

  const { selectedDataset } = useSelector((state) => state.datasets);
  const { selectedPreprocessedDataset, allPreprocessedDatasets } = useSelector(
    (state) => state.preprocessedDatasets
  );
  const { fullStats = {}, filter } = useSelector((state) => state.preprocessedDatasetDetail);
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
  const noDataset = fullStats.total_all === 0 || !fullStats.total_all;

  useEffect(() => {
    if (firstrun.current) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      firstrun.current = false;
      return;
    }
    const loadDataset = async () => {
      if (!allPreprocessedDatasets.length) {
        const response = await dispatch(asyncFetchAllPreprocessedDatasets());
        // cari dataset dengan id default
        const defaultDataset = response.find((dataset) => dataset.id === 'default');
        if (defaultDataset) {
          dispatch(setSelectedPreprocessedDataset(defaultDataset.id));
          await dispatch(asyncFetchPreprocessedDatasetDetail(1, 10, filter));
        } else {
          dispatch(setSelectedPreprocessedDataset(''));
          dispatch(resetPreprocessedDatasetDetail());
        }
      } else {
        // cari dataset dengan id default
        const defaultDataset = allPreprocessedDatasets.find((dataset) => dataset.id === 'default');
        if (defaultDataset) {
          if (defaultDataset.id !== selectedPreprocessedDataset) {
            dispatch(setSelectedPreprocessedDataset(defaultDataset.id));
            await dispatch(asyncFetchPreprocessedDatasetDetail(1, 10, filter));
          } else {
            await dispatch(asyncFetchPreprocessedDatasetDetail(1, 10, filter));
          }
        } else {
          dispatch(setSelectedPreprocessedDataset(''));
          dispatch(resetPreprocessedDatasetDetail());
        }
      }
    };

    if (selectedModelId) {
      const loadData = async () => {
        await dispatch(asyncFetchModelDetail(selectedModelId));
        await dispatch(fetchParameters(selectedModelId));
      };
      loadDataset();
      loadData();
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return;
    }
    if (allPreprocessedDatasets.length > 0 && selectedPreprocessedDataset) {
      const loadData = async () => {
        dispatch(resetParameter());
        dispatch(resetModelDetail());
      };
      loadDataset();
      loadData();
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return;
    }
    loadDataset();
    dispatch(resetModelDetail());
    dispatch(resetParameter());
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [selectedModelId, selectedPreprocessedDataset, allPreprocessedDatasets, filter, dispatch]);

  const handleSplitChange = async (newSplitSize) => {
    dispatch(updateParameter('default', 'default', newSplitSize));
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
    await dispatch(asyncTrainModel('default', 'default', name, splitSize, nNeighbors));
  };

  return (
    <Pages>
      {isLoading && <Loading page='admin-home' />}
      <div className='parameters-page'>
        <div className='dataset-table-header'>
          <div className='dataset-select-upload'>
            <h2>Parameters:</h2>
            {/* <ModelSelect /> */}
          </div>
          <div className='dataset-table-header-info'>
            <p>
              <strong>Old Data:</strong> {fullStats?.total_old || 0}
            </p>
            <p>
              <strong> New Data:</strong> {fullStats?.total_new || 0}
            </p>
          </div>
        </div>
        <div className='parameters-container-section'>
          <div className='parameters-upper'>
            <div className='parameters-upper-left'>
              <div className='form-section'>
                <ParameterInfo
                  totalData={fullStats?.total_all || 0}
                  topicCounts={fullStats?.topic_counts_all || {}}
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
