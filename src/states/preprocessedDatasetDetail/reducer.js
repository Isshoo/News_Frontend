import {
  SET_PREPROCESSED_DATASET_DETAIL,
  RESET_PREPROCESSED_DATASET_DETAIL,
  UPDATE_PREPROCESSED_DATA_ROW_LABEL,
  DELETE_PREPROCESSED_DATA_ROW,
  ADD_PREPROCESSED_DATA_ROW,
  SET_PREPROCESSED_DATASET_DETAIL_LOADING,
  SET_PREPROCESSED_DATASET_PAGE,
  SET_PREPROCESSED_DATASET_LIMIT,
} from './action';

const initialState = {
  data: [],
  totalData: 0,
  topicCounts: {},
  totalPages: 1,
  currentPage: 1,
  limit: 10,
  loadingDetail: false,
};

const preprocessedDatasetDetailReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_PREPROCESSED_DATASET_DETAIL:
    return {
      ...state,
      data: action.payload.data,
      totalData: action.payload.totalData,
      topicCounts: action.payload.topicCounts,
      totalPages: action.payload.totalPages,
    };
  case RESET_PREPROCESSED_DATASET_DETAIL:
    return { ...initialState };
  case UPDATE_PREPROCESSED_DATA_ROW_LABEL:
    return {
      ...state,
      data: state.data.map((row) =>
        row.id === action.payload.index ? { ...row, topik: action.payload.newLabel } : row
      ),
    };
  case DELETE_PREPROCESSED_DATA_ROW:
    return {
      ...state,
      data: state.data.filter((row) => row.id !== action.payload),
    };
  case ADD_PREPROCESSED_DATA_ROW:
    return {
      ...state,
      data: [
        ...state.data,
        {
          id: state.data.length + 1,
          contentSnippet: action.payload.contentSnippet,
          topik: action.payload.topik,
        },
      ],
    };
  case SET_PREPROCESSED_DATASET_DETAIL_LOADING:
    return {
      ...state,
      loadingDetail: action.payload,
    };
  case SET_PREPROCESSED_DATASET_PAGE:
    return {
      ...state,
      currentPage: action.payload,
    };
  case SET_PREPROCESSED_DATASET_LIMIT:
    return {
      ...state,
      limit: action.payload,
    };
  default:
    return state;
  }
};

export default preprocessedDatasetDetailReducer;
