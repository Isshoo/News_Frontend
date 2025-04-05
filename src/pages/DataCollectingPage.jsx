import React, { useState, useEffect, useRef } from 'react';
import Pages from '../components/styled/Pages';
import DatasetUpload from '../components/page-comps/DataCollecting-Page/DatasetUpload';
import DatasetTable from '../components/page-comps/DataCollecting-Page/DatasetTable';
import DatasetInfo from '../components/page-comps/DataCollecting-Page/DatasetInfo';
import Pagination from '../components/Base/Pagination';
import { DatasetSelect } from '../components/Base/Select';
import { fetchDatasets, fetchDataset, uploadDataset } from '../utils/api/dataset';

const DataCollectingPage = () => {
  const firstRun = useRef(true);
  const firstFetch = useRef(true);
  const [datasets, setDatasets] = useState([]);
  const [selectedDataset, setSelectedDataset] = useState(
    localStorage.getItem('selectedDataset') || null
  );
  const [dataset, setDataset] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [topicCounts, setTopicCounts] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const loadDatasets = async () => {
    const response = await fetchDatasets();
    if (response.error) {
      setDatasets([]);
      return;
    }
    setDatasets(response);
  };

  const loadDataset = async (selectedDataset, currentPage, limit) => {
    setLoading(true);
    setDataLoading(true);
    try {
      const response = await fetchDataset(selectedDataset, currentPage, limit);
      setDataset(response.data);
      setTotalData(response.total_data);
      setTopicCounts(response.topic_counts);
      setTotalPages(response.total_pages);
    } catch (error) {
      console.error('Error fetching dataset:', error);
    }
    setLoading(false);
    setDataLoading(false);
  };

  const loadDatasetData = async (selectedDataset, currentPage, limit) => {
    setDataLoading(true);
    try {
      const response = await fetchDataset(selectedDataset, currentPage, limit);
      setDataset(response.data);
    } catch (error) {
      console.error('Error fetching dataset:', error);
    }
    setDataLoading(false);
  };

  const handleUpload = async (file) => {
    setUploading(true);
    const response = await uploadDataset(file);

    if (response.error) {
      alert(response.error);
    } else {
      alert('Dataset uploaded successfully!');
      await loadDatasets();
      setSelectedDataset(response.dataset.id);
      setCurrentPage(1);
      await loadDataset(selectedDataset, 1, limit);
      localStorage.setItem('selectedDataset', response.dataset.id);
      localStorage.removeItem('preprocessed_dataset_id');
      localStorage.removeItem('modelId');
    }
    setUploading(false);
  };

  const handleDatasetSelection = async (event) => {
    const selectedId = event.target.value;
    setSelectedDataset(selectedId);
    setCurrentPage(1);
    await loadDataset(selectedDataset, currentPage, limit);
    localStorage.setItem('selectedDataset', selectedId);
    localStorage.removeItem('preprocessed_dataset_id');
    localStorage.removeItem('modelId');
  };

  const handleSetPage = async (page) => {
    setCurrentPage(page);
    await loadDatasetData(selectedDataset, page, limit);
  };

  useEffect(() => {
    if (firstRun.current) {
      loadDatasets();
      firstRun.current = false;
    }
  }, []);

  useEffect(() => {
    if (!selectedDataset || !firstFetch.current) return;
    firstFetch.current = false;
    localStorage.setItem('selectedDataset', selectedDataset);
    loadDataset(selectedDataset, currentPage, limit);
  }, [selectedDataset, currentPage, limit]);

  return (
    <Pages>
      <DatasetUpload onUpload={handleUpload} uploading={uploading} />
      <br />
      <h3>Select Dataset</h3>
      <div>
        <DatasetSelect
          datasets={datasets}
          selectedDataset={selectedDataset}
          handleDatasetSelection={handleDatasetSelection}
        />
      </div>
      <br />
      {selectedDataset && (
        <>
          <DatasetInfo
            totalData={totalData || 0}
            topicCounts={topicCounts || {}}
            loading={loading}
          />
          <br />
          <DatasetTable data={dataset || []} loading={dataLoading} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages || 1}
            setCurrentPage={handleSetPage}
          />
        </>
      )}
    </Pages>
  );
};

export default DataCollectingPage;
