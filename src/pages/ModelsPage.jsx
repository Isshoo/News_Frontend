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
  };

  const handleRename = (id, newName) => {
    dispatch(editModelNameThunk(id, newName));
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
