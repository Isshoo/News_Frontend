import React, { useState, useEffect } from 'react';
import Pages from '../components/styled/Pages';
import DatasetUpload from '../components/page-comps/DataCollecting-Page/DatasetUpload';
import DatasetTable from '../components/page-comps/DataCollecting-Page/DatasetTable';
import DatasetInfo from '../components/page-comps/DataCollecting-Page/DatasetInfo';
import { fetchDataset, fetchDatasetInfo, uploadDataset } from '../utils/api/dataset';

function DataCollectingPage() {
  const [dataset, setDataset] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [topicCounts, setTopicCounts] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Load total data dan distribusi topik hanya saat pertama kali halaman dimuat atau setelah upload dataset
  useEffect(() => {
    const loadDatasetInfo = async () => {
      try {
        const response = await fetchDatasetInfo();
        setTotalData(response.totalData);
        setTopicCounts(response.topicCounts);
      } catch (error) {
        console.error('Error fetching dataset info:', error);
      }
    };

    loadDatasetInfo();
  }, []); // Hanya dijalankan sekali saat pertama kali halaman dimuat

  // Load dataset dengan paginasi setiap kali currentPage atau limit berubah
  useEffect(() => {
    const loadDataset = async () => {
      setLoading(true);
      try {
        const response = await fetchDataset(currentPage, limit);
        setDataset(response.data);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error('Error fetching dataset:', error);
      }
      setLoading(false);
    };

    loadDataset();
  }, [currentPage, limit]); // Hanya dijalankan saat paginasi berubah

  async function handleUpload(file) {
    setUploading(true);
    const response = await uploadDataset(file);

    if (response.error) {
      alert(response.error);
    } else {
      alert('Dataset uploaded successfully!');

      // Ambil ulang informasi dataset setelah upload
      const datasetInfo = await fetchDatasetInfo();
      setTotalData(datasetInfo.totalData);
      setTopicCounts(datasetInfo.topicCounts);

      // Set currentPage ke 1 dan langsung ambil dataset baru
      setCurrentPage(1);
      const datasetResponse = await fetchDataset(1, limit);
      setDataset(datasetResponse.data);
      setTotalPages(datasetResponse.totalPages);
    }
    setUploading(false);
  }

  if (dataset && totalData && topicCounts && totalPages) {
    return (
      <Pages>
        <DatasetUpload onUpload={handleUpload} uploading={uploading} />
        <br />
        <DatasetInfo totalData={totalData} topicCounts={topicCounts} />
        <br />
        <DatasetTable
          data={dataset}
          limit={limit}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          loading={loading}
          totalPages={totalPages}
        />
      </Pages>
    );
  }

  return (
    <Pages>
      <DatasetUpload onUpload={handleUpload} uploading={uploading} />
    </Pages>
  );
}

export default DataCollectingPage;
