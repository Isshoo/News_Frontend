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

import { setSelectedDataset } from '../states/datasets/action';
import { setSelectedPreprocessedDataset } from '../states/preprocessedDatasets/action';
import { setSelectedModel } from '../states/models/action';

const ModelsPage = () => {
  const dispatch = useDispatch();
  const firstRun = useRef(true);
  const { models } = useSelector((state) => state.models);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    if (firstRun.current) {
      dispatch(fetchModels());
      // delaying the loading state
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      firstRun.current = false;
      return;
    }
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteModelThunk(id));
    dispatch(setSelectedDataset(''));
    dispatch(setSelectedPreprocessedDataset(''));
    dispatch(setSelectedModel('', ''));
  };

  const handleRename = async (id, newName) => {
    await dispatch(editModelNameThunk(id, newName));
    dispatch(fetchModels());
  };

  if (models === undefined) return null;
  return (
    <Pages>
      <h2>Saved Models</h2>
      {loading ? (
        <Loading />
      ) : models.length == 0 ? (
        <p>No models available.</p>
      ) : (
        <div>
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
    </Pages>
  );
};

export default ModelsPage;
