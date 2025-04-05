import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pages from '../components/styled/Pages';
import ClassifyInput from '../components/page-comps/Classify-Page/ClassifyInput';
import ClassifyResult from '../components/page-comps/Classify-Page/ClassifyResult';
import { ModelSelect } from '../components/Base/Select';
import { showFormattedDate } from '../utils/helper';
import { classifyNews } from '../states/classifier/thunk';
import { asyncFetchModels } from '../states/models/thunk';
import { setSelectedModel } from '../states/models/action';

const ClassifyPage = () => {
  const dispatch = useDispatch();
  const firstRun = useRef(true);

  const { predictionResult, loading } = useSelector((state) => state.classifier);
  const { models, selectedModelId } = useSelector((state) => state.models);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    dispatch(asyncFetchModels());
  }, [dispatch]);

  const handleModelChange = (e) => {
    const modelId = e.target.value;

    const foundModel = models.find((model) => model.id === modelId);
    dispatch(setSelectedModel(modelId, foundModel?.model_path || ''));
  };

  const predictNews = (text) => {
    dispatch(classifyNews(text));
  };

  return (
    <Pages>
      <div className='small-page'>
        <h2>Select Model</h2>
        <ModelSelect
          models={models}
          selectedModelId={selectedModelId}
          handleModelChange={handleModelChange}
          showFormattedDate={showFormattedDate}
        />
        <br />
        <br />
        <ClassifyInput predictNews={predictNews} loading={loading} />
        <br />
        {predictionResult?.preprocessed && (
          <ClassifyResult
            preprocessedText={predictionResult.preprocessed}
            hybridPredict={predictionResult.hybrid}
            deepseekPredict={predictionResult.deepseek}
            loading={loading}
          />
        )}
      </div>
    </Pages>
  );
};

export default ClassifyPage;
