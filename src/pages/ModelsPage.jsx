import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pages from '../components/styled/Pages';
import ModelItem from '../components/page-comps/Models-Page/ModelItem';
import {
  asyncFetchModels as fetchModels,
  asyncDeleteModel as deleteModelThunk,
  asyncUpdateModelName as editModelNameThunk,
} from '../states/models/thunk';

const ModelsPage = () => {
  const dispatch = useDispatch();
  const { models, loading } = useSelector((state) => state.models);

  useEffect(() => {
    dispatch(fetchModels());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteModelThunk(id));
  };

  const handleRename = (id, newName) => {
    dispatch(editModelNameThunk(id, newName));
  };

  return (
    <Pages>
      <h2>Saved Models</h2>
      {loading ? (
        <p>Loading models...</p>
      ) : models.length > 0 ? (
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
      ) : (
        <p>No models available.</p>
      )}
    </Pages>
  );
};

export default ModelsPage;
