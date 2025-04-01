import React, { useState, useEffect, useRef } from 'react';
import { fetchDatasets, deleteDataset } from '../utils/api/dataset';
import Pages from '../components/styled/Pages';
import DatasetItem from '../components/page-comps/Datasets-Page/DatasetItem';

const DatasetsPage = () => {
  const firstRun = useRef(true);
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
    } else {
      fetchAllDatasets();
    }
  }, []);

  const fetchAllDatasets = async () => {
    setLoading(true);
    try {
      const data = await fetchDatasets();
      setDatasets(data);
    } catch (error) {
      console.error('Error fetching datasets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this dataset?')) {
      try {
        await deleteDataset(id);
        setDatasets(datasets.filter((dataset) => dataset.raw_dataset_id !== id));
      } catch (error) {
        console.error('Error deleting dataset:', error);
      }
    }
  };

  return (
    <Pages>
      <h2>Uploaded Datasets</h2>
      {loading ? (
        <p>Loading datasets...</p>
      ) : datasets.length > 0 ? (
        <div>
          {datasets.map((dataset) => (
            <DatasetItem key={dataset.id} dataset={dataset} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <p>No datasets available.</p>
      )}
    </Pages>
  );
};

export default DatasetsPage;
