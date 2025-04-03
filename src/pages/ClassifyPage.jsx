import React, { useState, useEffect, useRef } from 'react';
import Pages from '../components/styled/Pages';
import { predict } from '../utils/api/classifier';
import { getModels } from '../utils/api/process';
import ClassifyInput from '../components/page-comps/Classify-Page/ClassifyInput';
import ClassifyResult from '../components/page-comps/Classify-Page/ClassifyResult';

const ClassifyPage = () => {
  const firstRun = useRef(true);
  const [models, setModels] = useState([]);
  const [selectedModelId, setSelectedModelId] = useState(
    localStorage.getItem('classifierModel') || ''
  );
  const [selectedModelPath, setSelectedModelPath] = useState('');
  const [hybridPredict, setHybridPredict] = useState('');
  const [deepseekPredict, setDeepseekPredict] = useState('');
  const [preprocessedText, setPreprocessedText] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const loadModels = async () => {
      try {
        const response = await getModels();
        setModels(response);

        // Cek apakah model yang dipilih sebelumnya masih ada dalam daftar models
        if (selectedModelId) {
          const foundModel = response.find((model) => model.id === selectedModelId);
          if (foundModel) {
            setSelectedModelPath(foundModel.model_path);
          } else {
            localStorage.removeItem('classifierModel'); // Hapus jika tidak valid
            setSelectedModelId('');
          }
        }
      } catch (error) {
        console.error('Error fetching models:', error);
      }
    };
    loadModels();
  }, [selectedModelId]);

  const handleModelChange = (e) => {
    const modelId = e.target.value;
    setSelectedModelId(modelId);
    localStorage.setItem('classifierModel', modelId);

    const foundModel = models.find((model) => model.id === modelId);
    setSelectedModelPath(foundModel ? foundModel.model_path : '');
  };

  const predictNews = async (text, retryCount = 4) => {
    if (retryCount <= 0) {
      console.warn('DeepSeek prediction failed after multiple retries.');
      setLoading(false);
      return;
    }

    setLoading(true);
    const response = await predict({ text, model_path: selectedModelPath });

    if (response.error) {
      alert(response.error);
      return;
    }

    if (!response.DeepSeek) {
      console.log(`DeepSeek prediction missing. Retrying... (${4 - retryCount} attempt)`);
      setTimeout(() => predictNews(text, retryCount - 1), 1000);
      return;
    }

    setHybridPredict(response.Hybrid_C5_KNN);
    setDeepseekPredict(response.DeepSeek);
    setPreprocessedText(response.Preprocessed_Text);
    setLoading(false);
  };

  return (
    <Pages>
      <div className='small-page'>
        <h2>Select Model</h2>
        <select onChange={handleModelChange} value={selectedModelId}>
          <option value='default-stemmed' disabled>
            -- Select Model --
          </option>
          {models.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name} (Created: {new Date(model.created_at).toLocaleString()})
            </option>
          ))}
        </select>
        <br />
        <br />
        <ClassifyInput predictNews={predictNews} loading={loading} />
        <br />
        <ClassifyResult
          preprocessedText={preprocessedText}
          hybridPredict={hybridPredict}
          deepseekPredict={deepseekPredict}
          loading={loading}
        />
      </div>
    </Pages>
  );
};

export default ClassifyPage;
