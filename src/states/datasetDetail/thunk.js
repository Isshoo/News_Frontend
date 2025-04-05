// /src/states/datasetDetail/thunk.js

import {
  setDatasetDetail,
  setDatasetDetailLoading,
  setDatasetPage,
  setDatasetLimit,
} from './action';

import { fetchDataset } from '../../utils/api/dataset';

// Thunk: Fetch detail data dari dataset tertentu
export const asyncFetchDatasetDetail = (datasetId, page = 1, limit = 10) => async (dispatch) => {
  dispatch(setDatasetDetailLoading(true));
  const result = await fetchDataset(datasetId, page, limit);
  if (!result.error) {
    dispatch(setDatasetDetail({
      data: result.data,
      totalData: result.total_data,
      topicCounts: result.topic_counts,
      totalPages: result.total_pages,
    }));
    dispatch(setDatasetPage(page));
    dispatch(setDatasetLimit(limit));
  }
  dispatch(setDatasetDetailLoading(false));
};
