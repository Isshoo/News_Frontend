import {
  setPreprocessedDatasetDetail,
  updatePreprocessedDataRowLabel,
  deletePreprocessedDataRow,
  setPreprocessedDatasetDetailLoading,
  setPreprocessedDatasetPage,
  setPreprocessedDatasetLimit,
} from './action';

import {
  fetchPreprocessedDataset,
  updatePreprocessedData,
  deleteData,
  addData,
} from '../../utils/api/preprocess';

import Swal from 'sweetalert2';

export const asyncFetchPreprocessedDatasetDetail = (datasetId, page = 1, limit = 10) => async (dispatch) => {
  dispatch(setPreprocessedDatasetDetailLoading(true));
  const result = await fetchPreprocessedDataset(datasetId, page, limit);
  if (!result.error) {
    dispatch(setPreprocessedDatasetDetail({
      data: result.data,
      totalData: result.total_data,
      topicCounts: result.topic_counts,
      totalPages: result.total_pages,
    }));
    dispatch(setPreprocessedDatasetPage(page));
    dispatch(setPreprocessedDatasetLimit(limit));
  }
  dispatch(setPreprocessedDatasetDetailLoading(false));
};

export const asyncUpdatePreprocessedData = (datasetId, index, newLabel, newPreprocessedContent) => async (dispatch, getState) => {
  try {
    const result = await updatePreprocessedData(datasetId, index, newLabel, newPreprocessedContent); // API call
    if (!result.error) {
      const { limit, currentPage } = getState().preprocessedDatasetDetail;
      dispatch(asyncFetchPreprocessedDatasetDetail(datasetId, currentPage, limit)); // Refresh data
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: result.message || `Successfully updated the preprocessed data in index ${  index  }.`,
      });
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: result.error || `Failed to update the preprocessed data in index ${  index  }.`,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

export const asyncDeletePreprocessedData = (datasetId, index) => async (dispatch, getState) => {
  try {
    const confirm = await Swal.fire({
      title: 'Delete Preprocessed Data?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (!confirm.isConfirmed) return { canceled: true };

    const result = await deleteData(datasetId, index); // API call

    if (!result.error) {
      const  NowCurrentPage = getState().preprocessedDatasetDetail.currentPage;
      await dispatch(asyncFetchPreprocessedDatasetDetail(datasetId)); // Refresh data
      const { limit, totalPages } = getState().preprocessedDatasetDetail;
      if (totalPages > 0 && NowCurrentPage > totalPages) {
        dispatch(asyncFetchPreprocessedDatasetDetail(datasetId, totalPages, limit));
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: result.message || `Successfully deleted the preprocessed data in index ${  index  }.`,
        });
        return;
      }
      dispatch(asyncFetchPreprocessedDatasetDetail(datasetId, NowCurrentPage, limit)); // Refresh data

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: result.message || `Successfully deleted the preprocessed data in index ${  index  }.`,
      });
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: result.error || `Failed to delete the preprocessed data in index ${  index  }.`,
      });
    }

  } catch (err) {
    console.error(err);
  }
};

export const asyncAddPreprocessedData = (datasetId, contentSnippet, topik) => async (dispatch, getState) => {
  try {
    const response = await addData(datasetId, contentSnippet, topik); // API call
    if (!response.error) {
      await dispatch(asyncFetchPreprocessedDatasetDetail(datasetId)); // Refresh data
      const { limit, totalPages } = getState().preprocessedDatasetDetail;
      if (totalPages > 0) {
        dispatch(asyncFetchPreprocessedDatasetDetail(datasetId, totalPages, limit));
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: response.message || 'Successfully added the preprocessed data.',
        });
        return;
      }
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: response.message || 'Successfully added the preprocessed data.',
      });
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: response.error || 'Failed to add the preprocessed data.',
      });
    }
  } catch (err) {
    console.error(err);
  }
};
