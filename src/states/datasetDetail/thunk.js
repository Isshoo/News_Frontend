// /src/states/datasetDetail/thunk.js

import Swal from 'sweetalert2';

import {
  setDatasetDetail,
  setDatasetHistoryDetail,
  setDatasetDetailLoading,
  setDatasetPage,
  setDatasetLimit,
  addData,
  deleteData,
} from './action';

import { fetchDataset, getHistoryById, addDatas, deleteDatas } from '../../utils/api/dataset';

// Thunk: Fetch detail data dari dataset tertentu
export const asyncFetchDatasetDetail = (datasetId, page = 1, limit = 10) => async (dispatch) => {
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
};

export const asyncDeleteData = (datasetId, arrayContentSnippet) => async (dispatch, getState) => {
  try {
    const confirm = await Swal.fire({
      title: 'Delete Data?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (!confirm.isConfirmed) return { canceled: true };

    const result = await deleteDatas(datasetId, arrayContentSnippet); // API call

    if (!result.error) {
      const  NowCurrentPage = getState().datasetDetail.currentPage;
      const { limit, currentPage } = getState().datasetDetail;
      await dispatch(asyncFetchDatasetDetail(datasetId, currentPage, limit)); // Refresh data
      const { totalPages } = getState().datasetDetail;
      if (totalPages > 0 && NowCurrentPage > totalPages) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: result.message || 'Successfully deleted the data.',
        });
        await dispatch(asyncFetchDatasetDetail(datasetId, totalPages, limit));
        return;
      }

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: result.message || 'Successfully deleted the data.',
      });
      await dispatch(asyncFetchDatasetDetail(datasetId, NowCurrentPage, limit)); // Refresh data
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: result.error || 'Failed to delete the data .',
      });
    }

  } catch (err) {
    console.error(err);
  }
};

export const asyncAddData = (datasetId, arrayObjek) => async (dispatch, getState) => {
  try {
    // cek untuk di array jika ada item yang contentSnippet atau topik kosong
    const emptyObject = arrayObjek.find((item) => !item.contentSnippet || !item.topik);
    if (emptyObject) {
      Swal.fire({
        icon: 'warning',
        title: 'Empty Fields',
        text: 'Please fill in all fields before saving.',
      });
      return;
    }

    const response = await addDatas(datasetId, arrayObjek); // API call
    if (!response.error) {
      const { limit, currentPage } = getState().datasetDetail;
      await dispatch(asyncFetchDatasetDetail(datasetId, currentPage, limit)); // Refresh data
      const { totalPages } = getState().datasetDetail;
      if (totalPages > 0 && totalPages > currentPage) {
        await dispatch(asyncFetchDatasetDetail(datasetId, 1, limit));
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: response.message || 'Successfully added the data.',
        });
        return;
      }
      await dispatch(asyncFetchDatasetDetail(datasetId, 1, limit));
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: response.message || 'Successfully added the data.',
      });
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: response.error || 'Failed to add the data.',
      });
    }
  } catch (err) {
    console.error(err);
  }
};

// Thunk: Fetch history data dari dataset tertentu
export const asyncFetchDatasetHistoryDetail = (datasetId) => async (dispatch) => {
  const result = await getHistoryById(datasetId);
  if (!result.error) {
    dispatch(setDatasetHistoryDetail(result));
  }
};
