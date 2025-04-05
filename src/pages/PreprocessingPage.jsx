import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  asyncFetchPreprocessedDatasets,
  asyncPreprocessRawDataset,
  asyncCreatePreprocessedCopy,
  deletePreprocessedDatasetById,
} from '../states/preprocessedDatasets/thunk';
import {
  asyncFetchPreprocessedDatasetDetail,
  asyncUpdatePreprocessedDataLabel,
  asyncDeletePreprocessedData,
  asyncAddPreprocessedData,
} from '../states/preprocessedDatasetDetail/thunk';
import { resetPreprocessedDatasetDetail } from '../states/preprocessedDatasetDetail/action';
import { setSelectedPreprocessedDataset } from '../states/preprocessedDatasets/action';

import Pages from '../components/styled/Pages';
import Pagination from '../components/Base/Pagination';
import { ListDataset } from '../components/Base/Select';
import PreprocessTable from '../components/page-comps/Preprocessing-Page/PreprocessTable';
import AddDataPopup from '../components/page-comps/Preprocessing-Page/AddDataPopup';

const PreprocessingPage = () => {
  const dispatch = useDispatch();

  const { selectedDataset } = useSelector((state) => state.datasets);
  const { selectedPreprocessedDataset, preprocessedDatasets } = useSelector(
    (state) => state.preprocessedDatasets
  );

  const { data, totalPages, currentPage, limit, loadingDetail } = useSelector(
    (state) => state.preprocessedDataset
  );

  const [editingIndex, setEditingIndex] = useState(null);
  const [newLabel, setNewLabel] = useState('');
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [newContent, setNewContent] = useState('');
  const [newTopic, setNewTopic] = useState('');

  useEffect(() => {
    if (selectedDataset) dispatch(asyncFetchPreprocessedDatasets(selectedDataset));
  }, [dispatch, selectedDataset]);

  useEffect(() => {
    if (selectedPreprocessedDataset) {
      dispatch(asyncFetchPreprocessedDatasetDetail(selectedPreprocessedDataset));
    }
  }, [dispatch, selectedPreprocessedDataset]);

  const handlePreprocess = () => {
    const result = dispatch(asyncPreprocessRawDataset(selectedDataset));

    if (result?.data?.id) {
      const id = result.data.id;
      dispatch(asyncFetchPreprocessedDatasetDetail(id, 1, 10));
    }
  };

  const handleCopyDataset = () => {
    const name = prompt('Enter name for new dataset copy:');
    if (!name) return;
    dispatch(asyncCreatePreprocessedCopy(selectedDataset, name));
  };

  const handleEdit = (index, currentTopic) => {
    setEditingIndex(index);
    setNewLabel(currentTopic);
  };

  const handleSave = (index) => {
    dispatch(asyncUpdatePreprocessedDataLabel(selectedPreprocessedDataset, index, newLabel));
    setEditingIndex(null);
  };

  const handleDelete = (index) => {
    dispatch(asyncDeletePreprocessedData(selectedPreprocessedDataset, index));
  };

  const handleAddData = () => {
    dispatch(asyncAddPreprocessedData(selectedPreprocessedDataset, newContent, newTopic));
    setShowAddPopup(false);
    setNewContent('');
    setNewTopic('');
  };

  const handleDatasetSelection = (datasetId) => {
    if (datasetId === selectedPreprocessedDataset) return;
    dispatch(resetPreprocessedDatasetDetail());
    dispatch(setSelectedPreprocessedDataset(datasetId));
    dispatch(asyncFetchPreprocessedDatasetDetail(datasetId, 1, 10));
  };

  const handleDeleteDataset = (datasetId) => {
    if (datasetId === selectedPreprocessedDataset) {
      dispatch(resetPreprocessedDatasetDetail());
    }
    dispatch(deletePreprocessedDatasetById(datasetId));
  };

  const handleSetPage = (page) => {
    dispatch(asyncFetchPreprocessedDatasetDetail(selectedPreprocessedDataset, page, limit));
  };

  return (
    <Pages>
      <h2>Preprocessed Dataset</h2>
      {preprocessedDatasets.length === 0 ? (
        <button onClick={handlePreprocess}>Preprocess Raw Dataset</button>
      ) : (
        <>
          <h3>Select Preprocessed Dataset:</h3>
          <ListDataset
            preprocessedDatasets={preprocessedDatasets}
            rawDatasetId={selectedDataset}
            handleDatasetSelection={handleDatasetSelection}
            handleDeleteDataset={handleDeleteDataset}
          />
          {selectedPreprocessedDataset === selectedDataset ? (
            <button onClick={handleCopyDataset}>Copy Dataset to Edit</button>
          ) : (
            <button onClick={() => setShowAddPopup(true)}>Add Data</button>
          )}
          <PreprocessTable
            dataset={data}
            editingIndex={editingIndex}
            newLabel={newLabel}
            setNewLabel={setNewLabel}
            handleEdit={handleEdit}
            handleSave={handleSave}
            handleDelete={handleDelete}
            preprocessedDatasetId={selectedPreprocessedDataset}
            rawDatasetId={selectedDataset}
            loading={loadingDetail}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={handleSetPage}
          />
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
