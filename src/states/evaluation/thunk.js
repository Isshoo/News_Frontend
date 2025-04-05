// redux/evaluation/thunk.js
import { setEvaluation } from './action';
import { getModel } from '../../utils/api/process';

export const fetchEvaluation = (modelId) => async (dispatch) => {
  try {
    const response = await getModel(modelId);
    if (response?.evaluation) {
      dispatch(setEvaluation({
        modelId,
        confusionMatrix: response.evaluation.confusion_matrix,
        classificationReport: response.evaluation.classification_report,
      }));
    }
  } catch (error) {
    console.error('Failed to fetch evaluation:', error);
  }
};
