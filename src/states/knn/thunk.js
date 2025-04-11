// redux/neighbors/thunk.js
import { setNeighbors } from './action';
import { getNeighbors } from '../../utils/api/model';

export const fetchNeighbors = (modelId, page = 1, limit = 10) => async (dispatch) => {
  try {
    const response = await getNeighbors(modelId, page, limit);
    if (response?.data) {
      dispatch(setNeighbors({
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
    console.error('Failed to fetch neighbors:', error);
  }
};
