import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Papa from 'papaparse';
import Pages from '../components/styled/Pages';
import CsvPopup from '../components/page-comps/ClassifyCsv-Page/CsvPopup';
import ClassificationResultTable from '../components/page-comps/ClassifyCsv-Page/ClassificationResultTable';
import { classifyCsvThunk, classifyRowThunk } from '../states/classifier/thunk';
import {
  setCsvData,
  editCsvRow,
  addCsvRow,
  deleteCsvRow,
  setPopupOpen,
} from '../states/classifier/action';
import { asyncFetchModels } from '../states/models/thunk';
import { setSelectedModel } from '../states/models/action';

const CsvClassifierPage = () => {
  const dispatch = useDispatch();
  const firstRun = useRef(true);

  const { csvData, classificationResult, loading, isPopupOpen } = useSelector(
    (state) => state.classifier
  );
  const { models, selectedModelId } = useSelector((state) => state.models);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    dispatch(asyncFetchModels());
  }, [dispatch]);

  useEffect(() => {
    if (csvData.length === 0 && classificationResult.length === 0) {
      dispatch(setPopupOpen(true));
    }
  }, [dispatch, csvData, classificationResult]);

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

  const classifyAllCsv = async () => {
    if (csvData.length === 0) {
      alert('Tambahkan data terlebih dahulu!');
      return;
    }
    const response = await dispatch(classifyCsvThunk());

    if (response.error) {
      alert('Gagal mengklasifikasikan CSV');
    }
    dispatch(setPopupOpen(false));
    return response;
  };

  const classifySingleRow = (index, contentSnippet) => {
    dispatch(classifyRowThunk(index, contentSnippet));
  };

  const handlePopup = () => {
    dispatch(setPopupOpen(!isPopupOpen));
  };

  return (
    <Pages>
      <div className='csv-page'>
        {isPopupOpen && (
          <CsvPopup
            models={models}
            selectedModelId={selectedModelId || ''}
            handleModelChange={handleModelChange}
            handleFileUpload={handleFileUpload}
            handleAddRow={handleAddRow}
            classifyAllCsv={classifyAllCsv}
            loading={loading}
            csvData={csvData}
            handleEditCell={handleEditCell}
            handleDeleteRow={handleDeleteRow}
            setIsPopupOpen={handlePopup}
          />
        )}

        {classificationResult.length > 0 && (
          <ClassificationResultTable
            classificationResult={classificationResult}
            classifySingleRow={classifySingleRow}
          />
        )}
        <button onClick={handlePopup}>Popup</button>
      </div>
    </Pages>
  );
};

export default CsvClassifierPage;
