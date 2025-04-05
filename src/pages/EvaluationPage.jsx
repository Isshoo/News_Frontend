import React, { useState, useEffect } from 'react';
import { getModel } from '../utils/api/model';
import Pages from '../components/styled/Pages';
import ModelInfo from '../components/page-comps/Evaluation-Page/ModelInfo';
import ConfusionMatrix from '../components/page-comps/Evaluation-Page/ConfusionMatrix';
import ClassificationReport from '../components/page-comps/Evaluation-Page/ClassificationReport';

const EvaluationPage = () => {
  const [evaluationData, setEvaluationData] = useState(null);
  const [loading, setLoading] = useState(true);

  const modelId = localStorage.getItem('modelId');

  useEffect(() => {
    if (modelId) {
      fetchEvaluationData(modelId);
    }
  }, [modelId]);

  const fetchEvaluationData = async (modelId) => {
    try {
      const response = await getModel(modelId);
      setEvaluationData(response);
    } catch (error) {
      console.error('Error fetching evaluation data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Pages>
      <h2>Model Evaluation</h2>
      {loading ? (
        <p>Loading evaluation data...</p>
      ) : evaluationData ? (
        <>
          <ModelInfo evaluationData={evaluationData} />
          <ConfusionMatrix confusionMatrix={evaluationData.evaluation.confusion_matrix} />
          <ClassificationReport
            classificationReport={evaluationData.evaluation.classification_report}
          />
        </>
      ) : (
        <p>No evaluation data found for the selected model.</p>
      )}
    </Pages>
  );
};

export default EvaluationPage;
