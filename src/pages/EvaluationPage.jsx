import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pages from '../components/styled/Pages';
import ModelInfo from '../components/page-comps/Evaluation-Page/ModelInfo';
import ConfusionMatrix from '../components/page-comps/Evaluation-Page/ConfusionMatrix';
import ClassificationReport from '../components/page-comps/Evaluation-Page/ClassificationReport';
import { asyncFetchModelDetail } from '../states/modelDetail/thunk';
import { resetModelDetail } from '../states/modelDetail/action';
import { fetchEvaluation } from '../states/evaluation/thunk';
import { resetEvaluation } from '../states/evaluation/action';

const EvaluationPage = () => {
  const dispatch = useDispatch();
  const firstRun = useRef(true);

  const { selectedModelId } = useSelector((state) => state.models);
  const { loading, name, total_data } = useSelector((state) => state.modelDetail);
  const { confusionMatrix, classificationReport } = useSelector((state) => state.evaluation);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }

    dispatch(resetModelDetail());
    dispatch(resetEvaluation());

    if (selectedModelId) {
      dispatch(asyncFetchModelDetail(selectedModelId));
      dispatch(fetchEvaluation(selectedModelId));
    }
  }, [dispatch, selectedModelId]);

  return (
    <Pages>
      <h2>Model Evaluation</h2>
      {
        (loading ? <p>Loading evaluation data...</p> : confusionMatrix,
        classificationReport ? (
          <>
            <ModelInfo evaluationData={{ name, total_data }} />
            {confusionMatrix && <ConfusionMatrix confusionMatrix={confusionMatrix} />}
            {classificationReport && (
              <ClassificationReport classificationReport={classificationReport} />
            )}
          </>
        ) : (
          <p>No evaluation data found for the selected model.</p>
        ))
      }
    </Pages>
  );
};

export default EvaluationPage;
