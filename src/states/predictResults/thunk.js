// redux/tfidfStats/thunk.js
import { setPredictResults } from './action';
import { getPredictResults } from '../../utils/api/model';

export const fetchPredictResults = (modelId, page = 1, limit = 10) => async (dispatch) => {
  try {
    const response = await getPredictResults(modelId, page, limit);
    if (response?.data) {
      dispatch(setPredictResults({
        data: response.data,
        pagination: {
          currentPage: response.current_page,
          totalPages: response.total_pages,
          totalData: response.total_data,
          limit: response.limit,
        },
      }));
    }
  } catch (error) {
    console.error('Failed to fetch predict results:', error);
  }
};
