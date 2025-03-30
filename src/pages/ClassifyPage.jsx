import React, { useState } from 'react';
import Pages from '../components/styled/Pages';
import { predict } from '../utils/api/classifier';
import ClassifyInput from '../components/page-comps/Classify-Page/ClassifyInput';
import ClassifyResult from '../components/page-comps/Classify-Page/ClassifyResult';

function ClassifyPage() {
  const [hybridPredict, setHybridPredict] = useState('');
  const [deepseekPredict, setDeepseekPredict] = useState('');
  const [preprocessedText, setPreprocessedText] = useState('');
  const [loading, setLoading] = useState(false);

  async function predictNews(text) {
    setLoading(true);
    const response = await predict({ text });

    if (response.error) {
      alert(response.error);
      return;
    }

    if (!response.DeepSeek) {
      console.log('DeepSeek prediction...');
      predictNews();
    }

    setHybridPredict(response.Hybrid_C5_KNN);
    setDeepseekPredict(response.DeepSeek);
    setPreprocessedText(response.Preprocessed_Text);
    setLoading(false);
  }

  return (
    <Pages>
      <ClassifyInput predictNews={predictNews} loading={loading} />
      <br />
      <ClassifyResult
        preprocessedText={preprocessedText}
        hybridPredict={hybridPredict}
        deepseekPredict={deepseekPredict}
        loading={loading}
      />
    </Pages>
  );
}

export default ClassifyPage;
