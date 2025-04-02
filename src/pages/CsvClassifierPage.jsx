import React, { useState, useEffect } from 'react';
import Pages from '../components/styled/Pages';
import { predictCsv, predict } from '../utils/api/classifier';
import { getModels } from '../utils/api/process';
import Papa from 'papaparse';

const CsvClassifierPage = () => {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(localStorage.getItem('selectedModel') || '');
  const [csvData, setCsvData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [classificationResult, setClassificationResult] = useState([]);

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

    Papa.parse(file, {
      delimiter: ';',
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
    if (!selectedModel) {
      alert('Pilih model terlebih dahulu!');
      return;
    }

    if (csvData.length === 0) {
      alert('Tambahkan data terlebih dahulu!');
      return;
    }

    setLoading(true);

    try {
      const csvContent = csvData.map((row) => `${row.contentSnippet};${row.topik}`).join('\n');
      const csvBlob = new Blob([`contentSnippet;topik\n${csvContent}`], { type: 'text/csv' });
      const csvFile = new File([csvBlob], 'dataset.csv', { type: 'text/csv' });

      const response = await predictCsv(csvFile, selectedModel);
      setClassificationResult(response);
    } catch (error) {
      console.error('Error classifying CSV:', error);
      alert('Terjadi kesalahan saat memproses file CSV.');
    }

    setLoading(false);
  };

  const classifySingleRow = async (index, contentSnippet) => {
    try {
      const response = await predict({ text: contentSnippet, model_path: selectedModel });
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {classificationResult.map((row, index) => (
                <tr key={index}>
                  <td>{row.contentSnippet}</td>
                  <td>{row.topik}</td>
                  <td>{row.Hybrid_C5_KNN || '-'}</td>
                  <td>{row.DeepSeek || '-'}</td>
                  <td>
                    {(!row.DeepSeek || row.DeepSeek === '-') && (
                      <button onClick={() => classifySingleRow(index, row.contentSnippet)}>
                        Classify DeepSeek
                      </button>
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
