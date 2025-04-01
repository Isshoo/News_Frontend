import React, { useState, useEffect } from 'react';
import Pages from '../components/styled/Pages';
import { predictCsv } from '../utils/api/classifier';
import { getModels } from '../utils/api/process';

const CsvClassifierPage = () => {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(localStorage.getItem('selectedModel') || '');
  const [csvFile, setCsvFile] = useState(null); // Menyimpan file CSV
  const [loading, setLoading] = useState(false);
  const [classificationResult, setClassificationResult] = useState([]); // Menyimpan hasil klasifikasi

  useEffect(() => {
    const loadModels = async () => {
      try {
        const response = await getModels();
        setModels(response);
      } catch (error) {
        console.error('Error fetching models:', error);
      }
    };
    loadModels();
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setCsvFile(file); // Simpan file yang diunggah
  };

  const classifyAllCsv = async () => {
    if (!selectedModel) {
      alert('Pilih model terlebih dahulu!');
      return;
    }

    if (!csvFile) {
      alert('Upload file CSV terlebih dahulu!');
      return;
    }

    setLoading(true);
    try {
      const response = await predictCsv(csvFile, selectedModel);
      setClassificationResult(response); // Simpan hasil klasifikasi
    } catch (error) {
      console.error('Error classifying CSV:', error);
      alert('Terjadi kesalahan saat memproses file CSV.');
    }
    setLoading(false);
  };

  return (
    <Pages>
      <div>
        <h2>CSV Classifier</h2>

        <select
          value={selectedModel}
          onChange={(e) => {
            setSelectedModel(e.target.value);
            localStorage.setItem('selectedModel', e.target.value);
          }}
        >
          <option value=''>-- Select Model --</option>
          {models.map((model) => (
            <option key={model.id} value={model.model_path}>
              {model.name} (Created: {new Date(model.created_at).toLocaleString()})
            </option>
          ))}
        </select>

        <br />
        <br />

        <input type='file' accept='.csv' onChange={handleFileUpload} />
        <br />
        <br />

        <button onClick={classifyAllCsv} disabled={loading}>
          {loading ? 'Processing...' : 'Classify CSV'}
        </button>

        <br />
        <br />

        {classificationResult.length > 0 && (
          <table border='1'>
            <thead>
              <tr>
                <th>Content Snippet</th>
                <th>Label Aktual</th>
                <th>Hybrid Predicted</th>
                <th>DeepSeek Predicted</th>
              </tr>
            </thead>
            <tbody>
              {classificationResult.map((row, index) => (
                <tr key={index}>
                  <td>{row.contentSnippet}</td>
                  <td>{row.topik}</td>
                  <td>{row.Hybrid_C5_KNN || '-'}</td>
                  <td>{row.DeepSeek || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Pages>
  );
};

export default CsvClassifierPage;
