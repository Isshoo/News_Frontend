// redux/wordStats/thunk.js
import { setC5Stats } from './action';
import { getWordStats } from '../../utils/api/model';

export const fetchWordStats = (modelId, page = 1, limit = 10) => async (dispatch) => {
  try {
    const response = await getWordStats(modelId, page, limit);
    if (response?.data) {
      dispatch(setC5Stats({
        modelId,
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
    console.error('Failed to fetch word stats:', error);
  }
};
