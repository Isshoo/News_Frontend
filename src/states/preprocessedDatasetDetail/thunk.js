import {
  setPreprocessedDatasetDetail,
  setPreprocessedDatasetPage,
  setPreprocessedDatasetLimit,
  setPreprocessedDatasetFilter
} from './action';

import {
  fetchPreprocessedDataset,
  updatePreprocessedData,
  deleteData,
  addData,
  getPreprocessedData,
  addNewData,
  editNewData,
  deleteNewData,
  preprocessNewData,
  markAsTrained
} from '../../utils/api/preprocess';

import Swal from 'sweetalert2';

export const asyncFetchPreprocessedDatasetDetail = (page = 1, limit = 10, filter = 'new') => async (dispatch) => {
  const result = await getPreprocessedData(page, limit, filter);
  if (!result.error) {
    await dispatch(setPreprocessedDatasetDetail({
      data: result.data,
      totalData: result.total_data,
      topicCounts: result.topic_counts,
      totalPages: result.total_pages,
      fullStats: result.stats
    }));
    await dispatch(setPreprocessedDatasetPage(page));
    await dispatch(setPreprocessedDatasetLimit(limit));
    await dispatch(setPreprocessedDatasetFilter(filter));
  }
};

export const asyncUpdatePreprocessedData = (index, newLabel, newPreprocessedContent) => async (dispatch, getState) => {
  try {
    // cek jika kosong
    if (!newLabel || !newPreprocessedContent) {
      Swal.fire({
        icon: 'warning',
        title: 'Empty Fields',
        text: 'Please fill in all fields before saving.',
      });
      return;
    }
    // cek apakah ada perubahan pada label tapi ambil dulu id datanya jika sama dengan index
    const { preprocessedDatasetDetail } = getState();
    const { data } = preprocessedDatasetDetail;
    const currentData = data.find((item) => item.index === index);
    const currentLabel = currentData.topik;
    const currentPreprocessedContent = currentData.preprocessedContent;
    // jika tidak ada perubahan, tampilkan alert
    if (currentLabel === newLabel && currentPreprocessedContent === newPreprocessedContent) {
      return;
    }
    // jika ada perubahan, lanjutkan dengan update
    const newData = {
      topik: newLabel,
      contentSnippet: newPreprocessedContent
    };
    const result = await editNewData(index, newData); // API call
    if (!result.error) {
      const { limit, currentPage } = getState().preprocessedDatasetDetail;
      await dispatch(asyncFetchPreprocessedDatasetDetail(currentPage, limit)); // Refresh data
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

export const asyncDeletePreprocessedData = (index) => async (dispatch, getState) => {
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

    const indexes = [index];

    const result = await deleteNewData(indexes); // API call

    if (!result.error) {
      const  NowCurrentPage = getState().preprocessedDatasetDetail.currentPage;
      const { limit, currentPage } = getState().preprocessedDatasetDetail;
      await dispatch(asyncFetchPreprocessedDatasetDetail(currentPage, limit)); // Refresh data
      const { totalPages } = getState().preprocessedDatasetDetail;
      if (totalPages > 0 && NowCurrentPage > totalPages) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: result.message || `Successfully deleted the preprocessed data in index ${  index  }.`,
        });
        await dispatch(asyncFetchPreprocessedDatasetDetail(totalPages, limit));
        return;
      }

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: result.message || 'Successfully deleted the preprocessed data.',
      });
      await dispatch(asyncFetchPreprocessedDatasetDetail(NowCurrentPage, limit)); // Refresh data
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: result.error || 'Failed to delete the preprocessed data.',
      });
    }

  } catch (err) {
    console.error(err);
  }
};

export const asyncAddPreprocessedData = (datasetId, contentSnippet, topik) => async (dispatch, getState) => {
  try {
    if (!topik || !contentSnippet) {
      Swal.fire({
        icon: 'warning',
        title: 'Empty Fields',
        text: 'Please fill in all fields before saving.',
      });
      return;
    }

    const response = await addData(datasetId, contentSnippet, topik); // API call
    if (!response.error) {
      const { limit, currentPage } = getState().preprocessedDatasetDetail;
      await dispatch(asyncFetchPreprocessedDatasetDetail(datasetId, currentPage, limit)); // Refresh data
      const { totalPages } = getState().preprocessedDatasetDetail;
      if (totalPages > 0 && totalPages > currentPage) {
        await dispatch(asyncFetchPreprocessedDatasetDetail(datasetId, 1, limit));
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: response.message || 'Successfully added the preprocessed data.',
        });
        return;
      }
      await dispatch(asyncFetchPreprocessedDatasetDetail(datasetId, 1, limit));
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
