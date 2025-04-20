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
import ModelSelect from '../components/Base/ModelSelect';
import { MdInfoOutline } from 'react-icons/md';
import PopupModalInfoModel from '../components/page-comps/Evaluation-Page/PopupModalInfoModel';

const EvaluationPage = () => {
  const dispatch = useDispatch();
  const firstRun = useRef(true);

  const { selectedModelId } = useSelector((state) => state.models);
  const { loading, name, total_data } = useSelector((state) => state.modelDetail);
  const { confusionMatrix, classificationReport, accuracy } = useSelector(
    (state) => state.evaluation
  );

  const [showInfo, setShowInfo] = React.useState(false);

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
      <div className='evaluation-page'>
        <div className='dataset-table-header'>
          <div className='dataset-select-upload'>
            <h2>Evaluation:</h2>
            <ModelSelect />
          </div>
          <div className='dataset-table-header-info'>
            <p>
              <strong>Accuracy: {accuracy.toFixed(2) * 100 || 0}%</strong>
            </p>
            <button className='tfidf-icon' onClick={() => setShowInfo(true)}>
              <MdInfoOutline className='info-icon' />
            </button>
          </div>
        </div>
        <div className='evaluation-container'>
          <ConfusionMatrix confusionMatrix={confusionMatrix} />
          <ClassificationReport classificationReport={classificationReport} />
        </div>
        {showInfo && <PopupModalInfoModel onClose={() => setShowInfo(false)} />}
      </div>
    </Pages>
  );
};

export default EvaluationPage;
