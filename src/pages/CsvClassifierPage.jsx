import React, { useState, useEffect, useRef } from 'react';
import Pages from '../components/styled/Pages';
import { predictCsv, predict } from '../utils/api/classifier';
import { getModels } from '../utils/api/process';
import Papa from 'papaparse';

const CsvClassifierPage = () => {
  const firstRun = useRef(true);
  const [models, setModels] = useState([]);
  const [selectedModelId, setSelectedModelId] = useState(
    localStorage.getItem('classifierModel') || ''
  );
  const [selectedModelPath, setSelectedModelPath] = useState('');
  const [csvData, setCsvData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [classificationResult, setClassificationResult] = useState([]);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const loadModels = async () => {
      try {
        const response = await getModels();
        setModels(response);

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

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      delimiter: ',',
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        setCsvData(result.data);
      },
    });
  };

  const handleEditCell = (index, field, value) => {
    const updatedData = [...csvData];
    updatedData[index][field] = value;
    setCsvData(updatedData);
  };

  const handleAddRow = () => {
    setCsvData([...csvData, { contentSnippet: '', topik: '' }]);
  };

  const handleDeleteRow = (index) => {
    setCsvData(csvData.filter((_, i) => i !== index));
  };

  const classifyAllCsv = async () => {
    if (csvData.length === 0) {
      alert('Tambahkan data terlebih dahulu!');
      return;
    }

    setLoading(true);

    try {
      const csvContent = csvData.map((row) => `"${row.contentSnippet}","${row.topik}"`).join('\n');
      const csvBlob = new Blob([`"contentSnippet","topik"\n${csvContent}`], { type: 'text/csv' });
      const csvFile = new File([csvBlob], 'classification-result.csv', { type: 'text/csv' });

      const response = await predictCsv(csvFile, selectedModelPath);
      setClassificationResult(response);
    } catch (error) {
      console.error('Error classifying CSV:', error);
      alert('Terjadi kesalahan saat memproses file CSV.');
    }

    setLoading(false);
  };

  const classifySingleRow = async (index, contentSnippet) => {
    try {
      const response = await predict({ text: contentSnippet, model_path: selectedModelPath });
      const updatedResults = [...classificationResult];
      updatedResults[index].DeepSeek = response?.DeepSeek || '-';
      setClassificationResult(updatedResults);
    } catch (error) {
      console.error('Error classifying single row:', error);
      alert('Terjadi kesalahan saat mengklasifikasikan data.');
    }
  };

  return (
    <Pages>
      <div>
        <h2>CSV Classifier</h2>
        <select value={selectedModelId} onChange={handleModelChange}>
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

        <input type='file' accept='.csv' onChange={handleFileUpload} />
        <br />
        <br />

        {csvData.length > 0 && (
          <table border='1'>
            <thead>
              <tr>
                <th>Content Snippet</th>
                <th>Topik</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {csvData.map((row, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type='text'
                      value={row.contentSnippet}
                      onChange={(e) => handleEditCell(index, 'contentSnippet', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type='text'
                      value={row.topik}
                      onChange={(e) => handleEditCell(index, 'topik', e.target.value)}
                    />
                  </td>
                  <td>
                    <button onClick={() => handleDeleteRow(index)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <br />
        <button onClick={handleAddRow}>Tambah Data</button>
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
                <th>Topik</th>
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
                  <td>
                    {!row.DeepSeek || row.DeepSeek === '-' ? (
                      <button onClick={() => classifySingleRow(index, row.contentSnippet)}>
                        Classify Again
                      </button>
                    ) : (
                      <>{row.DeepSeek}</>
                    )}
                  </td>
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
