import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  asyncFetchPreprocessedDatasets,
  asyncPreprocessRawDataset,
  asyncCreatePreprocessedCopy,
  asyncDeletePreprocessedDataset,
} from '../states/preprocessedDatasets/thunk';
import {
  asyncFetchPreprocessedDatasetDetail,
  asyncUpdatePreprocessedDataLabel,
  asyncDeletePreprocessedData,
  asyncAddPreprocessedData,
} from '../states/preprocessedDatasetDetail/thunk';
import { resetPreprocessedDatasetDetail } from '../states/preprocessedDatasetDetail/action';
import { setSelectedPreprocessedDataset } from '../states/preprocessedDatasets/action';

import { setSelectedModel } from '../states/models/action';
import { setSelectedDataset } from '../states/datasets/action';

import Pages from '../components/styled/Pages';
import Pagination from '../components/Base/Pagination';
import { ListDataset } from '../components/Base/Select';
import PreprocessTable from '../components/page-comps/Preprocessing-Page/PreprocessTable';
import AddDataPopup from '../components/page-comps/Preprocessing-Page/AddDataPopup';

const PreprocessingPage = () => {
  const dispatch = useDispatch();
  const firstRun = useRef(true);
  const firstRun2 = useRef(true);

  const { selectedDataset } = useSelector((state) => state.datasets);
  const { selectedPreprocessedDataset, preprocessedDatasets } = useSelector(
    (state) => state.preprocessedDatasets
  );

  const {
    data = [],
    totalPages = 1,
    currentPage = 1,
    limit = 10,
    loadingDetail,
  } = useSelector((state) => state.preprocessedDatasetDetail);

  const [editingIndex, setEditingIndex] = useState(null);
  const [newLabel, setNewLabel] = useState('');
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [newContent, setNewContent] = useState('');
  const [newTopic, setNewTopic] = useState('');

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }

    if (selectedDataset) {
      dispatch(asyncFetchPreprocessedDatasets(selectedDataset));
    }
  }, [dispatch, selectedDataset]);

  useEffect(() => {
    if (firstRun2.current) {
      firstRun2.current = false;
      return;
    }
    dispatch(resetPreprocessedDatasetDetail());
    if (selectedPreprocessedDataset) {
      dispatch(asyncFetchPreprocessedDatasetDetail(selectedPreprocessedDataset));
    }
  }, [dispatch, selectedPreprocessedDataset]);

  const handlePreprocess = async () => {
    const result = await dispatch(asyncPreprocessRawDataset(selectedDataset));
    if (result?.data?.id) {
      const id = result.data.id;
      dispatch(setSelectedPreprocessedDataset(id));
      dispatch(setSelectedModel('', ''));
      dispatch(asyncFetchPreprocessedDatasetDetail(id, 1, 10));
    }
  };

  const handleCopyDataset = async () => {
    const name = prompt('Enter name for new dataset copy:');
    if (!name) return;
    const response = await dispatch(asyncCreatePreprocessedCopy(selectedDataset, name));
    if (response?.data?.id) {
      const id = response.data.id;
      dispatch(setSelectedPreprocessedDataset(id));
      dispatch(setSelectedModel('', ''));
      dispatch(asyncFetchPreprocessedDatasetDetail(id, 1, 10));
    }
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
    if (!newContent || !newTopic) {
      alert('Please fill in all fields.');
      return;
    }
    dispatch(
      asyncAddPreprocessedData(selectedPreprocessedDataset, newContent, newTopic, totalPages, limit)
    );
    setShowAddPopup(false);
  };

  const handleDatasetSelection = (datasetId) => {
    if (datasetId === selectedPreprocessedDataset) return;
    dispatch(resetPreprocessedDatasetDetail());
    dispatch(setSelectedPreprocessedDataset(datasetId));
    dispatch(setSelectedModel('', ''));
    dispatch(asyncFetchPreprocessedDatasetDetail(datasetId, 1, 10));
  };

  const handleDeleteDataset = (datasetId) => {
    if (datasetId === selectedPreprocessedDataset) {
      dispatch(resetPreprocessedDatasetDetail());
    }
    dispatch(asyncDeletePreprocessedDataset(datasetId));
    dispatch(setSelectedPreprocessedDataset(''));
    dispatch(setSelectedModel('', ''));
  };

  const handleSetPage = (page) => {
    if (selectedPreprocessedDataset) {
      dispatch(asyncFetchPreprocessedDatasetDetail(selectedPreprocessedDataset, page, limit));
    }
  };

  return (
    <Pages>
      <h2>Preprocessed Dataset</h2>
      {!selectedDataset ? (
        <p>Silakan pilih dataset mentah terlebih dahulu.</p>
      ) : preprocessedDatasets.length === 0 ? (
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

          {selectedPreprocessedDataset ? (
            <>
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

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={handleSetPage}
                />
              )}
            </>
          ) : (
            <p>Silakan pilih salah satu preprocessed dataset.</p>
          )}
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
