// src/pages/DatasetsPage.jsx
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncFetchDatasets, asyncDeleteDataset } from '../states/datasets/thunk';

import Pages from '../components/styled/Pages';
import Loading from '../components/Base/LoadingBar';
import DatasetItem from '../components/page-comps/Datasets-Page/DatasetItem';

const DatasetsPage = () => {
  const firstRun = useRef(true);
  const dispatch = useDispatch();
  const { datasets } = useSelector((state) => state.datasets);
  const [isLoading, setIsloading] = React.useState(true);

  useEffect(() => {
    if (firstRun.current) {
      dispatch(asyncFetchDatasets());
      // delaying the loading state
      setTimeout(() => {
        setIsloading(false);
      }, 1000);
      firstRun.current = false;
      return;
    }
  }, [dispatch]);

  const handleDeleteDataset = (id) => {
    dispatch(asyncDeleteDataset(id));
  };

  if (datasets === undefined) return null;

  return (
    <Pages>
      <h2>Uploaded Datasets</h2>
      {isLoading ? (
        <Loading />
      ) : datasets.length == 0 ? (
        <p>No datasets available.</p>
      ) : (
        <div>
          {datasets.map((dataset) => (
            <DatasetItem key={dataset.id} dataset={dataset} onDelete={handleDeleteDataset} />
          ))}
        </div>
      )}
    </Pages>
  );
};

export default DatasetsPage;
