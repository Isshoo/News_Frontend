// redux/tfidfStats/thunk.js
import { setTfidfStats } from './action';
import { getTfidfStats } from '../../utils/api/model';

export const fetchTfidfStats = (modelId, page = 1, limit = 10) => async (dispatch) => {
  try {
    const response = await getTfidfStats(modelId, page, limit);
    if (response?.data) {
      dispatch(setTfidfStats({
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
    console.error('Failed to fetch TF-IDF stats:', error);
  }
};
