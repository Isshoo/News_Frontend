// src/pages/DatasetsPage.jsx
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncFetchDatasets, asyncDeleteDataset } from '../states/datasets/thunk';

import { setSelectedDataset } from '../states/datasets/action';
import { setSelectedPreprocessedDataset } from '../states/preprocessedDatasets/action';
import { setSelectedModel } from '../states/models/action';

import Pages from '../components/styled/Pages';
import Loading from '../components/Base/LoadingBar';
import DatasetItem from '../components/page-comps/Datasets-Page/DatasetItem';

import Swal from 'sweetalert2';

const DatasetsPage = () => {
  const firstRun = useRef(true);
  const dispatch = useDispatch();
  const { datasets } = useSelector((state) => state.datasets);
  const [isLoading, setIsloading] = React.useState(true);
  const [deletingId, setDeletingId] = React.useState(null);

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

  const handleDeleteDataset = async (id) => {
    setDeletingId(id);
    const result = await dispatch(asyncDeleteDataset(id));
    if (!result?.canceled) {
      dispatch(setSelectedDataset(''));
      dispatch(setSelectedPreprocessedDataset(''));
      dispatch(setSelectedModel('', ''));
    }
    setDeletingId(null);
  };

  if (datasets === undefined) return null;

  return (
    <Pages>
      <div className='datasets-page'>
        <h2>Uploaded Datasets</h2>
        {isLoading ? (
          <Loading />
        ) : datasets.length == 0 ? (
          <p>No datasets available.</p>
        ) : (
          <div>
            {datasets.map((dataset) => (
              <DatasetItem
                key={dataset.id}
                dataset={dataset}
                onDelete={handleDeleteDataset}
                deletingId={deletingId}
              />
            ))}
          </div>
        )}
      </div>
    </Pages>
  );
};

export default DatasetsPage;
