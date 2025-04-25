import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pages from '../components/styled/Pages';
import ConfusionMatrix from '../components/page-comps/Evaluation-Page/ConfusionMatrix';
import ClassificationReport from '../components/page-comps/Evaluation-Page/ClassificationReport';
import { fetchEvaluation } from '../states/evaluation/thunk';
import ModelSelect from '../components/Base/ModelSelect';
import { MdInfoOutline } from 'react-icons/md';
import PopupModalInfoModel from '../components/page-comps/Evaluation-Page/PopupModalInfoModel';
import { resetEvaluation } from '../states/evaluation/action';
import Loading from '../components/Base/LoadingBar';

const EvaluationPage = () => {
  const dispatch = useDispatch();
  const firstrun = useRef(true);

  const { selectedModelId } = useSelector((state) => state.models);
  const { confusionMatrix, classificationReport, accuracy } = useSelector(
    (state) => state.evaluation
  );

  const [loading, setLoading] = React.useState(true);

  const [showInfo, setShowInfo] = React.useState(false);

  useEffect(() => {
    if (firstrun.current) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      firstrun.current = false;
      return;
    }
    if (!selectedModelId) {
      dispatch(resetEvaluation());
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      return;
    }
    const loadData = async () => {
      await dispatch(fetchEvaluation(selectedModelId));
    };

    loadData();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [dispatch, selectedModelId]);

  return (
    <Pages>
      {loading && <Loading page='admin-home' />}
      <div className='evaluation-page'>
        <div className='dataset-table-header header-eval-page'>
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
