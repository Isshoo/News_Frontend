import React, { useState, useEffect, useRef } from 'react';
import Pages from '../components/styled/Pages';
import DatasetUpload from '../components/page-comps/DataCollecting-Page/DatasetUpload';
import DatasetTable from '../components/page-comps/DataCollecting-Page/DatasetTable';
import DatasetInfo from '../components/page-comps/DataCollecting-Page/DatasetInfo';
import Pagination from '../components/Base/Pagination';
import { fetchDatasets, fetchDataset, uploadDataset } from '../utils/api/dataset';

const DataCollectingPage = () => {
  const firstRun = useRef(true);
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

  // Load daftar dataset saat pertama kali halaman dimuat
  useEffect(() => {
    if (firstRun.current) {
      const loadDatasets = async () => {
        const response = await fetchDatasets();
        setDatasets(response);
      };
      loadDatasets();
      firstRun.current = false;
    }
  }, []);

  // Load dataset yang dipilih dengan paginasi
  useEffect(() => {
    if (!selectedDataset) return;
    localStorage.setItem('selectedDataset', selectedDataset);
    const loadDataset = async () => {
      setLoading(true);
      try {
        const response = await fetchDataset(selectedDataset);
        setTotalData(response.total_data);
        setTopicCounts(response.topic_counts);
        setTotalPages(response.total_pages);
      } catch (error) {
        console.error('Error fetching dataset:', error);
      }
      setLoading(false);
    };
    loadDataset();
  }, [selectedDataset]);

  useEffect(() => {
    if (!selectedDataset) return;
    const loadDataset = async () => {
      setDataLoading(true);
      try {
        const response = await fetchDataset(selectedDataset, currentPage, limit);
        setDataset(response.data);
      } catch (error) {
        console.error('Error fetching dataset:', error);
      }
      setDataLoading(false);
    };
    loadDataset();
  }, [selectedDataset, currentPage, limit]);

  const handleUpload = async (file) => {
    setUploading(true);
    const response = await uploadDataset(file);

    if (response.error) {
      alert(response.error);
    } else {
      alert('Dataset uploaded successfully!');
      const datasets = await fetchDatasets();
      setDatasets(datasets);
      setSelectedDataset(response.dataset.id);
      setCurrentPage(1);
      localStorage.setItem('selectedDataset', response.dataset.id);
    }
    setUploading(false);
  };

  const handleDatasetSelection = (event) => {
    const selectedId = event.target.value;
    setSelectedDataset(selectedId);
    setCurrentPage(1);
    localStorage.setItem('selectedDataset', selectedId);
  };

  return (
    <Pages>
      <DatasetUpload onUpload={handleUpload} uploading={uploading} />
      <br />
      <select onChange={handleDatasetSelection} value={selectedDataset || ''}>
        <option value='' disabled>
          Select a dataset
        </option>
        {datasets.map((dataset) => (
          <option key={dataset.id} value={dataset.id}>
            {dataset.name}
          </option>
        ))}
      </select>
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
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </Pages>
  );
};

export default DataCollectingPage;
