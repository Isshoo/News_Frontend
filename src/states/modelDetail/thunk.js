import { setModelDetail } from './action';
import { getModel } from '../../utils/api/model';

export const asyncFetchModelDetail = (modelId) => async (dispatch) => {
  const response = await getModel(modelId);
  if (!response.error) {
    dispatch(setModelDetail({
      name: response.name,
      raw_dataset_id: response.raw_dataset_id,
      preprocessed_dataset_id: response.preprocessed_dataset_id,
      model_path: response.model_path,
      total_data: response.total_data,
      created_at: response.created_at,
      updated_at: response.updated_at,
      accuracy: response.accuracy,
      n_neighbors: response.n_neighbors,
      split_size: response.split_size,
    }));
  }
  return response;
};

