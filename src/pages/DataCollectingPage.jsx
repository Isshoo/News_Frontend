import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pages from '../components/styled/Pages';
import DatasetUpload from '../components/page-comps/DataCollecting-Page/DatasetUpload';
import DatasetTable from '../components/page-comps/DataCollecting-Page/DatasetTable';
import DatasetInfo from '../components/page-comps/DataCollecting-Page/DatasetInfo';
import PopupModalInfo from '../components/page-comps/DataCollecting-Page/PopupModalInfo';
import Pagination from '../components/Base/Pagination';
import { DatasetSelect } from '../components/Base/Select';
import { asyncFetchDatasetDetail } from '../states/datasetDetail/thunk';
import { resetDatasetDetail } from '../states/datasetDetail/action';
import { asyncFetchDatasets, asyncUploadDataset } from '../states/datasets/thunk';
import { setSelectedDataset } from '../states/datasets/action';
import { setSelectedModel } from '../states/models/action';
import { setSelectedPreprocessedDataset } from '../states/preprocessedDatasets/action';

const DataCollectingPage = () => {
  const firstRun = useRef(true);
  const firstRun2 = useRef(true);
  const dispatch = useDispatch();
  const [loadingInfo, setLoadingInfo] = React.useState(false);
  const [showInfo, setShowInfo] = React.useState(false);

  const { datasets, selectedDataset, isUploading, isLoading } = useSelector(
    (state) => state.datasets
  );
  const {
    data = [],
    totalData = 0,
    topicCounts = {},
    totalPages = 1,
    currentPage = 1,
    limit = 10,
    loadingDetail,
  } = useSelector((state) => state.datasetDetail);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    dispatch(asyncFetchDatasets());
  }, [dispatch]);

  useEffect(() => {
    if (firstRun2.current) {
      firstRun2.current = false;
      return;
    }
    if (selectedDataset) {
      dispatch(asyncFetchDatasetDetail(selectedDataset));
    }
  }, [dispatch, selectedDataset]);

  const handleUpload = async (file) => {
    const result = await dispatch(asyncUploadDataset(file));
    if (!result.error) {
      const newId = result.dataset.id;
      dispatch(setSelectedDataset(newId));
      dispatch(setSelectedPreprocessedDataset(newId));
      dispatch(setSelectedModel('', ''));
    }
  };

  const handleDatasetSelection = (event) => {
    const selectedId = event.target.value;
    if (selectedId === selectedDataset) return;

    dispatch(setSelectedDataset(selectedId));
    dispatch(setSelectedPreprocessedDataset(selectedId));
    dispatch(setSelectedModel('', ''));
    dispatch(asyncFetchDatasetDetail(selectedId, 1, 10));
  };

  const handleSetPage = (page) => {
    if (selectedDataset) {
      dispatch(asyncFetchDatasetDetail(selectedDataset, page, limit));
    }
  };

  return (
    <Pages>
      {selectedDataset ? (
        <div className='dataset-container-selected'>
          {showInfo && (
            <PopupModalInfo
              onClose={() => setShowInfo(false)}
              totalData={totalData}
              topicCounts={topicCounts}
              loading={loadingInfo}
              datasets={datasets}
              selectedDataset={selectedDataset}
            />
          )}

          <div className='dataset-container-selected-lower'>
            <DatasetTable
              data={data}
              loading={loadingDetail}
              totalData={totalData}
              setShowInfo={setShowInfo}
              datasets={datasets}
              selectedDataset={selectedDataset}
              handleDatasetSelection={handleDatasetSelection}
              isLoading={isLoading}
            />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={handleSetPage}
            />
          </div>
          <DatasetUpload
            onUpload={handleUpload}
            uploading={isUploading}
            selectedDataset={selectedDataset}
          />
        </div>
      ) : (
        <div className='dataset-container-not-selected'>
          <div className='dataset-table-header'>
            <div className='dataset-select-upload'>
              <h2>Dataset:</h2>
              {datasets.length > 0 && (
                <DatasetSelect
                  datasets={datasets}
                  selectedDataset={selectedDataset}
                  handleDatasetSelection={handleDatasetSelection}
                  loading={isLoading}
                />
              )}
            </div>
          </div>
          <div className='not-selected-upload'>
            <DatasetUpload onUpload={handleUpload} uploading={isUploading} />
          </div>
        </div>
      )}
    </Pages>
  );
};

export default DataCollectingPage;
