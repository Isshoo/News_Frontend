import React, { useState, useEffect } from 'react';
import {
  fetchPreprocessedDataset,
  updateLabel,
  deleteData,
  addData,
} from '../utils/api/preprocess';
import Pages from '../components/styled/Pages';
import PreprocessTable from '../components/page-comps/Preprocessing-Page/PreprocessTable';
import Pagination from '../components/Base/Pagination';
import AddDataPopup from '../components/page-comps/Preprocessing-Page/AddDataPopup';

const PreprocessingPage = () => {
  const [dataset, setDataset] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newLabel, setNewLabel] = useState('');
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [newContent, setNewContent] = useState('');
  const [newTopic, setNewTopic] = useState('');

  useEffect(() => {
    loadDataset(currentPage);
  }, [currentPage]);

  const loadDataset = async (page) => {
    const response = await fetchPreprocessedDataset(page, 10);
    if (!response.error) {
      setDataset(response.data);
      setTotalPages(response.totalPages);
    }
  };

  const handleEdit = (index, currentTopic) => {
    setEditingIndex(index);
    setNewLabel(currentTopic);
  };

  const handleSave = async (index) => {
    await updateLabel(index, newLabel);
    setEditingIndex(null);
    loadDataset(currentPage);
  };

  const handleDelete = async (index) => {
    await deleteData(index);
    loadDataset(currentPage);
  };

  const handleAddData = async () => {
    await addData(newContent, newTopic);
    setShowAddPopup(false);
    setNewContent('');
    setNewTopic('');
    loadDataset(currentPage);
  };

  return (
    <Pages>
      <h2>Preprocessed Dataset</h2>
      <button onClick={() => setShowAddPopup(true)}>Add Data</button>
      <PreprocessTable
        dataset={dataset}
        editingIndex={editingIndex}
        newLabel={newLabel}
        setNewLabel={setNewLabel}
        handleEdit={handleEdit}
        handleSave={handleSave}
        handleDelete={handleDelete}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
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
