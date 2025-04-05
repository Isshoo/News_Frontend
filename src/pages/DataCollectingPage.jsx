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
import { fetchDatasets, uploadDataset } from '../states/datasets/thunk';
import { setSelectedDataset } from '../states/datasets/action';

const DataCollectingPage = () => {
  const dispatch = useDispatch();
  const { datasets, selectedDataset, isUploading } = useSelector((state) => state.datasets);
  const { data, total_data, topic_counts, total_pages, currentPage, limit, loading } = useSelector(
    (state) => state.datasetDetail
  );

  useEffect(() => {
    dispatch(fetchDatasets());
  }, [dispatch]);

  useEffect(() => {
    if (selectedDataset) {
      dispatch(asyncFetchDatasetDetail(selectedDataset));
    }
  }, [dispatch, selectedDataset]);

  const handleUpload = async (file) => {
    const result = await dispatch(uploadDataset(file));

    if (result?.payload?.dataset?.id) {
      const newId = result.payload.dataset.id;
      dispatch(asyncFetchDatasetDetail(newId, 1, 10));
    }
  };

  const handleDatasetSelection = (event) => {
    const selectedId = event.target.value;
    if (selectedId === selectedDataset) return;
    dispatch(resetDatasetDetail());
    dispatch(setSelectedDataset(selectedId));
    dispatch(asyncFetchDatasetDetail(selectedId, 1, 10));
  };

  const handleSetPage = (page) => {
    dispatch(asyncFetchDatasetDetail(selectedDataset, page, limit));
  };

  return (
    <Pages>
      <DatasetUpload onUpload={handleUpload} uploading={isUploading} />
      <br />
      <h3>Select Dataset</h3>
      <DatasetSelect
        datasets={datasets}
        selectedDataset={selectedDataset}
        handleDatasetSelection={handleDatasetSelection}
      />
      <br />
      {selectedDataset && (
        <>
          <DatasetInfo
            totalData={total_data || 0}
            topicCounts={topic_counts || {}}
            loading={loading}
          />
          <br />
          <DatasetTable data={data || []} loading={loading} />
          <Pagination
            currentPage={currentPage}
            totalPages={total_pages || 1}
            setCurrentPage={handleSetPage}
          />
        </>
      )}
    </Pages>
  );
};

export default DataCollectingPage;
