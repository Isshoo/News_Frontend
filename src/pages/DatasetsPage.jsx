// src/pages/DatasetsPage.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncFetchDatasets, asyncDeleteDataset } from '../states/datasets/thunk';

import Pages from '../components/styled/Pages';
import DatasetItem from '../components/page-comps/Datasets-Page/DatasetItem';

const DatasetsPage = () => {
  const dispatch = useDispatch();
  const { datasets, isLoading } = useSelector((state) => state.datasets);

  useEffect(() => {
    dispatch(asyncFetchDatasets());
  }, [dispatch]);

  const handleDeleteDataset = (id) => {
    dispatch(asyncDeleteDataset(id));
  };

  return (
    <Pages>
      <h2>Uploaded Datasets</h2>
      {isLoading ? (
        <p>Loading datasets...</p>
      ) : datasets.length > 0 ? (
        <div>
          {datasets.map((dataset) => (
            <DatasetItem key={dataset.id} dataset={dataset} onDelete={handleDeleteDataset} />
          ))}
        </div>
      ) : (
        <p>No datasets available.</p>
      )}
    </Pages>
  );
};

export default DatasetsPage;
