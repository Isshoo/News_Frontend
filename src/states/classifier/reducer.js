const initialState = {
  models: [],
  selectedModelId: localStorage.getItem('classifierModel') || 'default-stemmed',
  selectedModelPath: 'src/storage/models/base/hybrid_model.joblib',

  hybridPredict: '',
  deepseekPredict: '',
  preprocessedText: '',

  csvData: [],
  classificationResult: [],

  loading: false,
};

const classifierReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_MODELS':
    return { ...state, models: action.payload };

  case 'SET_SELECTED_MODEL':
    return {
      ...state,
      selectedModelId: action.payload.id,
      selectedModelPath: action.payload.path,
    };

  case 'SET_PREDICTION':
    return {
      ...state,
      hybridPredict: action.payload.hybrid,
      deepseekPredict: action.payload.deepseek,
      preprocessedText: action.payload.preprocessed,
    };

  case 'SET_CSV_DATA':
    return { ...state, csvData: action.payload };

  case 'EDIT_CSV_ROW': {
    const updatedCsv = state.csvData.map((row, i) => {
      if (i === action.payload.index) {
        return {
          ...row,
          [action.payload.field]: action.payload.value,
        };
      }
      return row;
    });
    return { ...state, csvData: updatedCsv };
  }

  case 'ADD_CSV_ROW':
    return {
      ...state,
      csvData: [...state.csvData, { contentSnippet: '', topik: '' }],
    };

  case 'DELETE_CSV_ROW':
    return {
      ...state,
      csvData: state.csvData.filter((_, i) => i !== action.payload),
    };

  case 'SET_CLASSIFICATION_RESULT':
    return { ...state, classificationResult: action.payload };

  case 'UPDATE_CLASSIFICATION_ROW': {
    const updatedResult = [...state.classificationResult];
    updatedResult[action.payload.index] = {
      ...updatedResult[action.payload.index],
      [action.payload.field]: action.payload.value,
    };
    return { ...state, classificationResult: updatedResult };
  }

  case 'SET_LOADING':
    return { ...state, loading: action.payload };

  default:
    return state;
  }
};

export default classifierReducer;
