import React, { useState, useEffect } from 'react';
import {
  preprocessDataset,
  createPreprocessedCopy,
  fetchPreprocessedDatasets,
  fetchPreprocessedDataset,
  deletePreprocessedDataset,
  updateLabel,
  deleteData,
  addData,
} from '../utils/api/preprocess';
import Pages from '../components/styled/Pages';
import PreprocessTable from '../components/page-comps/Preprocessing-Page/PreprocessTable';
import Pagination from '../components/Base/Pagination';
import AddDataPopup from '../components/page-comps/Preprocessing-Page/AddDataPopup';

const PreprocessingPage = () => {
  const rawDatasetId = localStorage.getItem('selectedDataset');
  const [dataset, setDataset] = useState([]);
  const [preprocessedDatasets, setPreprocessedDatasets] = useState([]);
  const [preprocessedDatasetId, setPreprocessedDatasetId] = useState(
    localStorage.getItem('preprocessed_dataset_id') || ''
  );
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newLabel, setNewLabel] = useState('');
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [newContent, setNewContent] = useState('');
  const [newTopic, setNewTopic] = useState('');

  useEffect(() => {
    if (rawDatasetId) {
      fetchPreprocessedDatasets(rawDatasetId).then((response) => {
        if (!response.error) {
          setPreprocessedDatasets(response);
        }
      });
    }
  }, [rawDatasetId]);

  useEffect(() => {
    if (preprocessedDatasetId) {
      loadDataset(preprocessedDatasetId, currentPage);
    }
  }, [preprocessedDatasetId, currentPage]);

  const loadDataset = async (datasetId, page) => {
    const response = await fetchPreprocessedDataset(datasetId, page, 10);
    if (!response.error) {
      setDataset(response.data);
      setTotalPages(response.total_pages);
    }
  };

  const handlePreprocess = async () => {
    const response = await preprocessDataset(rawDatasetId);
    if (!response.error) {
      localStorage.setItem('preprocessed_dataset_id', rawDatasetId);
      localStorage.removeItem('modelId');
      setPreprocessedDatasetId(rawDatasetId);
      loadDataset(rawDatasetId, 1);
    }
  };

  const handleCopyDataset = async () => {
    const name = prompt('Enter name for new dataset copy:');
    if (!name) return;

    const response = await createPreprocessedCopy(rawDatasetId, name);

    if (!response.error && response.data) {
      setPreprocessedDatasets((prevDatasets) => [...prevDatasets, response.data]);

      const newDatasetId = response.data.id;

      if (newDatasetId) {
        localStorage.setItem('preprocessed_dataset_id', newDatasetId);
        localStorage.removeItem('modelId');
        setPreprocessedDatasetId(newDatasetId);
        loadDataset(newDatasetId, 1);
      }
    }
  };

  const handleEdit = (index, currentTopic) => {
    setEditingIndex(index);
    setNewLabel(currentTopic);
  };

  const handleSave = async (index) => {
    await updateLabel(preprocessedDatasetId, index, newLabel);
    setEditingIndex(null);
    loadDataset(preprocessedDatasetId, currentPage);
  };

  const handleDelete = async (index) => {
    await deleteData(preprocessedDatasetId, index);
    loadDataset(preprocessedDatasetId, currentPage);
  };

  const handleAddData = async () => {
    await addData(preprocessedDatasetId, newContent, newTopic);
    setShowAddPopup(false);
    setNewContent('');
    setNewTopic('');
    loadDataset(preprocessedDatasetId, currentPage);
  };

  const handleDatasetSelection = (datasetId) => {
    localStorage.setItem('preprocessed_dataset_id', datasetId);
    localStorage.removeItem('modelId');
    setPreprocessedDatasetId(datasetId);
  };

  const handleDeleteDataset = async (datasetId) => {
    if (datasetId === rawDatasetId) return;

    const response = await deletePreprocessedDataset(datasetId);

    if (!response.error) {
      const updatedDatasets = await fetchPreprocessedDatasets(rawDatasetId);
      setPreprocessedDatasets(updatedDatasets || []);

      if (preprocessedDatasetId === datasetId) {
        const firstDataset = updatedDatasets.data?.[0] || { id: rawDatasetId };
        setPreprocessedDatasetId(firstDataset.id);
        localStorage.setItem('preprocessed_dataset_id', firstDataset.id);
        localStorage.removeItem('modelId');
        loadDataset(firstDataset.id, 1);
      }
    } else {
      console.error('Failed to delete dataset:', response.error);
    }
  };

  return (
    <Pages>
      <h2>Preprocessed Dataset</h2>
      {preprocessedDatasets.length === 0 ? (
        <button onClick={handlePreprocess}>Preprocess Raw Dataset</button>
      ) : (
        <>
          <h3>Select Preprocessed Dataset:</h3>
          <ul>
            {preprocessedDatasets.map((ds) => (
              <li key={ds.id}>
                <button onClick={() => handleDatasetSelection(ds.id)}>{ds.name}</button>
                {ds.id !== rawDatasetId && (
                  <button onClick={() => handleDeleteDataset(ds.id)}>Delete</button>
                )}
              </li>
            ))}
          </ul>
          {preprocessedDatasetId === rawDatasetId ? (
            <button onClick={handleCopyDataset}>Copy Dataset to Edit</button>
          ) : (
            <button onClick={() => setShowAddPopup(true)}>Add Data</button>
          )}
          <>
            <PreprocessTable
              dataset={dataset}
              editingIndex={editingIndex}
              newLabel={newLabel}
              setNewLabel={setNewLabel}
              handleEdit={handleEdit}
              handleSave={handleSave}
              handleDelete={handleDelete}
              preprocessedDatasetId={preprocessedDatasetId}
              rawDatasetId={rawDatasetId}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </>
        </>
      )}
      {showAddPopup && (
        <AddDataPopup
          newContent={newContent}
          setNewContent={setNewContent}
          newTopic={newTopic}
          setNewTopic={setNewTopic}
          handleAddData={handleAddData}
          setShowAddPopup={setShowAddPopup}
        />
      )}
    </Pages>
  );
};

export default PreprocessingPage;
