// redux/evaluation/thunk.js
import { setEvaluation } from './action';
import { getModelEvaluation } from '../../utils/api/model';

export const fetchEvaluation = (modelId) => async (dispatch) => {
  try {
    const response = await getModelEvaluation(modelId);
    if (response?.confusion_matrix && response?.classification_report && response?.accuracy) {
      dispatch(setEvaluation({
        accuracy: response.accuracy,
        confusionMatrix: response.confusion_matrix,
        classificationReport: response.classification_report,
      }));
    }
  } catch (error) {
    console.error('Failed to fetch evaluation:', error);
  }
};
