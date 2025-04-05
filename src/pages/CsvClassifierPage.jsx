import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pages from '../components/styled/Pages';
import { ModelSelect } from '../components/Base/Select';
import { showFormattedDate } from '../utils/helper';
import Papa from 'papaparse';
import { classifyCsvThunk, classifyRowThunk } from '../states/classifier/thunk';
import { setCsvData, editCsvRow, addCsvRow, deleteCsvRow } from '../states/classifier/action';
import { asyncFetchModels } from '../states/models/thunk';
import { setSelectedModel } from '../states/models/action';

const CsvClassifierPage = () => {
  const dispatch = useDispatch();
  const firstRun = useRef(true);

  const { csvData, classificationResult, loading } = useSelector((state) => state.classifier);
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

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      delimiter: ',',
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        dispatch(setCsvData(result.data));
      },
    });
  };

  const handleEditCell = (index, field, value) => {
    dispatch(editCsvRow(index, field, value));
  };

  const handleAddRow = () => {
    dispatch(addCsvRow());
  };

  const handleDeleteRow = (index) => {
    dispatch(deleteCsvRow(index));
  };

  const classifyAllCsv = () => {
    if (csvData.length === 0) {
      alert('Tambahkan data terlebih dahulu!');
      return;
    }
    dispatch(classifyCsvThunk());
  };

  const classifySingleRow = (index, contentSnippet) => {
    dispatch(classifyRowThunk(index, contentSnippet));
  };

  return (
    <Pages>
      <div>
        <h2>CSV Classifier</h2>
        <h3>Select Model</h3>
        <br />
        <ModelSelect
          models={models || []}
          selectedModelId={selectedModelId || ''}
          handleModelChange={handleModelChange}
          showFormattedDate={showFormattedDate}
        />
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
                      row.DeepSeek
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
