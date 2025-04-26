import React, { useEffect, useRef } from 'react';
import { Dropdown, Select as StyledSelect } from '../styled/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { asyncFetchModels } from '../../states/models/thunk';
import { setSelectedModel } from '../../states/models/action';
import { setSelectedDataset } from '../../states/datasets/action';
import { setSelectedPreprocessedDataset } from '../../states/preprocessedDatasets/action';
import { GiWorld } from 'react-icons/gi';

const ModelSelect = () => {
  const dispatch = useDispatch();
  const firstRun = useRef(true);
  const { models, selectedModelId } = useSelector((state) => state.models);

  useEffect(() => {
    const initialFetch = async () => {
      await dispatch(asyncFetchModels());
    };
    if (firstRun.current) {
      initialFetch();
      firstRun.current = false;
    }
  }, [dispatch]);

  const handleModelChange = (e) => {
    const modelId = e.target.value;
    const foundModel = models.find((model) => model.id === modelId);
    dispatch(setSelectedModel(modelId, foundModel?.model_path || ''));
    dispatch(setSelectedDataset(foundModel?.raw_dataset_id));
    dispatch(setSelectedPreprocessedDataset(foundModel?.preprocessed_dataset_id));
  };
  return (
    <Dropdown className={`modelDropdown ${models.length === 0 ? 'disabled' : ''}`}>
      <StyledSelect
        className='modelSelect'
        value={selectedModelId || ''}
        onChange={handleModelChange}
        disabled={models.length === 0}
      >
        {models.length === 0 ? (
          <option value=''>No models available</option>
        ) : (
          <>
            <option className='dataset-select-option' value='' disabled>
              Select a model
            </option>
            {models.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </>
        )}
      </StyledSelect>
    </Dropdown>
  );
};

export default ModelSelect;
