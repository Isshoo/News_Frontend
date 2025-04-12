// action

// action.js
export const addPredictionEntry = (entry) => ({
  type: 'ADD_PREDICTION_ENTRY',
  payload: entry,
});

export const updateLastPrediction = (result) => ({
  type: 'UPDATE_LAST_PREDICTION',
  payload: result,
});

export const setPopupOpen = (isOpen) => ({
  type: 'SET_POPUP_OPEN',
  payload: isOpen,
});


export const setPrediction = (hybrid, deepseek, preprocessed) => ({
  type: 'SET_PREDICTION',
  payload: { hybrid, deepseek, preprocessed },
});

export const addPrediction = (text, hybrid, deepseek, preprocessed) => ({
  type: 'ADD_PREDICTION',
  payload: { text, hybrid, deepseek, preprocessed },
});

export const clearPredictions = () => ({
  type: 'CLEAR_PREDICTIONS',
});


export const setCsvData = (data) => ({
  type: 'SET_CSV_DATA',
  payload: data,
});

export const editCsvRow = (index, field, value) => ({
  type: 'EDIT_CSV_ROW',
  payload: { index, field, value },
});

export const addCsvRow = () => ({
  type: 'ADD_CSV_ROW',
});

export const deleteCsvRow = (index) => ({
  type: 'DELETE_CSV_ROW',
  payload: index,
});

export const setClassificationResult = (result) => ({
  type: 'SET_CLASSIFICATION_RESULT',
  payload: result,
});

export const updateClassificationRow = (index, field, value) => ({
  type: 'UPDATE_CLASSIFICATION_ROW',
  payload: { index, field, value },
});

export const setLoading = (isLoading) => ({
  type: 'SET_LOADING',
  payload: isLoading,
});
