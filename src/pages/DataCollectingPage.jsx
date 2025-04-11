import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pages from '../components/styled/Pages';
import DatasetUpload from '../components/page-comps/DataCollecting-Page/DatasetUpload';
import DatasetTable from '../components/page-comps/DataCollecting-Page/DatasetTable';
import DatasetInfo from '../components/page-comps/DataCollecting-Page/DatasetInfo';
import Pagination from '../components/Base/Pagination';
import { DatasetSelect } from '../components/Base/Select';
import { asyncFetchDatasetDetail } from '../states/datasetDetail/thunk';
import { resetDatasetDetail } from '../states/datasetDetail/action';
import { asyncFetchDatasets, asyncUploadDataset } from '../states/datasets/thunk';
import { setSelectedDataset } from '../states/datasets/action';

const DataCollectingPage = () => {
  const dispatch = useDispatch();
  const [loadingInfo, setLoadingInfo] = React.useState(false);

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
    dispatch(asyncFetchDatasets());
  }, [dispatch]);

  useEffect(() => {
    if (selectedDataset) {
      dispatch(asyncFetchDatasetDetail(selectedDataset));
    }
  }, [dispatch, selectedDataset]);

  const handleUpload = async (file) => {
    const result = await dispatch(asyncUploadDataset(file));
    if (!result.error) {
      const newId = result.dataset.id;
      dispatch(setSelectedDataset(newId));
      dispatch(asyncFetchDatasetDetail(newId, 1, 10));
    }
  };

  const handleDatasetSelection = (event) => {
    const selectedId = event.target.value;
    if (selectedId === selectedDataset) return;

    setLoadingInfo(true);
    dispatch(resetDatasetDetail());
    dispatch(setSelectedDataset(selectedId));
    dispatch(asyncFetchDatasetDetail(selectedId, 1, 10));
    setLoadingInfo(false);
  };

  const handleSetPage = (page) => {
    if (selectedDataset) {
      dispatch(asyncFetchDatasetDetail(selectedDataset, page, limit));
    }
  };

  return (
    <Pages>
      <DatasetUpload onUpload={handleUpload} uploading={isUploading} />
      <br />
      <h3>Select Dataset</h3>
      <div>
        <DatasetSelect
          datasets={datasets}
          selectedDataset={selectedDataset}
          handleDatasetSelection={handleDatasetSelection}
          loading={isLoading}
        />
      </div>
      <br />
      {selectedDataset ? (
        <>
          <DatasetInfo totalData={totalData} topicCounts={topicCounts} loading={loadingInfo} />
          <br />
          <DatasetTable data={data} loading={loadingDetail} />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={handleSetPage}
            />
          )}
        </>
      ) : (
        <p>Silakan pilih dataset untuk melihat detail.</p>
      )}
    </Pages>
  );
};

export default DataCollectingPage;
