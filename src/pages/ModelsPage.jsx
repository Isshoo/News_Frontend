import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pages from '../components/styled/Pages';
import Loading from '../components/Base/LoadingBar';
import ModelItem from '../components/page-comps/Models-Page/ModelItem';
import {
  asyncFetchModels as fetchModels,
  asyncDeleteModel as deleteModelThunk,
  asyncUpdateModelName as editModelNameThunk,
} from '../states/models/thunk';
import { asyncFetchAllPreprocessedDatasets } from '../states/preprocessedDatasets/thunk';
import { asyncFetchDatasets } from '../states/datasets/thunk';

const ModelsPage = () => {
  const dispatch = useDispatch();
  const firstRun = useRef(true);
  const { models } = useSelector((state) => state.models);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const loadData = async () => {
      await dispatch(asyncFetchDatasets());
      await dispatch(asyncFetchAllPreprocessedDatasets());
      await dispatch(fetchModels());
    };
    loadData();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [dispatch]);

  const handleDelete = async (id) => {
    await dispatch(deleteModelThunk(id));
  };

  const handleRename = async (id, newName) => {
    await dispatch(editModelNameThunk(id, newName));
  };

  if (models === undefined) return null;
  return (
    <>
      <div className='page-header'>
        <h2>Trained Models</h2>
      </div>
      <Pages>
        <div className='admins-page'>
          {loading && <Loading />}
          {models.length == 0 ? (
            <p>No models available.</p>
          ) : (
            <div className='datasets container-list-item'>
              {models.map((model) => (
                <ModelItem
                  key={model.id}
                  model={model}
                  onDelete={handleDelete}
                  onRename={handleRename}
                />
              ))}
            </div>
          )}
        </div>
      </Pages>
    </>
  );
};

export default ModelsPage;
