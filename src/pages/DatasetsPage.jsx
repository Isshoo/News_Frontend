// src/pages/DatasetsPage.jsx
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncFetchDatasets, asyncDeleteDataset } from '../states/datasets/thunk';

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
    const loadDatasets = async () => {
      await dispatch(asyncFetchDatasets());
    };
    if (firstRun.current) {
      loadDatasets();
      setTimeout(() => {
        setIsloading(false);
      }, 1000);
      firstRun.current = false;
      return;
    }
  }, [dispatch]);

  const handleDeleteDataset = async (id) => {
    setDeletingId(id);
    await dispatch(asyncDeleteDataset(id));
    setDeletingId(null);
  };

  if (datasets === undefined) return null;

  return (
    <>
      <div className='datasets page-header'>
        <h2>Uploaded Datasets</h2>
      </div>
      <Pages>
        <div className='admins-page'>
          {isLoading && <Loading />}
          {datasets.length == 0 ? (
            <p>No datasets available.</p>
          ) : (
            <div className='datasets container-list-item'>
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
    </>
  );
};

export default DatasetsPage;
