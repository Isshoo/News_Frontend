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
  asyncUpdatePreprocessedData,
  asyncDeletePreprocessedData,
  asyncAddPreprocessedData,
} from '../states/preprocessedDatasetDetail/thunk';
import { resetPreprocessedDatasetDetail } from '../states/preprocessedDatasetDetail/action';
import { setSelectedPreprocessedDataset } from '../states/preprocessedDatasets/action';

import { setSelectedModel } from '../states/models/action';
import { setSelectedDataset } from '../states/datasets/action';

import Pages from '../components/styled/Pages';
import Pagination from '../components/Base/Pagination';
import { ListDataset, DatasetSelect } from '../components/Base/Select';

import PreprocessTable from '../components/page-comps/Preprocessing-Page/PreprocessTable';
import AddDataPopup from '../components/page-comps/Preprocessing-Page/AddDataPopup';

const PreprocessingPage = () => {
  const dispatch = useDispatch();
  const firstRun = useRef(true);
  const firstRun2 = useRef(true);

  const { selectedDataset } = useSelector((state) => state.datasets);
  const { selectedPreprocessedDataset, preprocessedDatasets, isLoading } = useSelector(
    (state) => state.preprocessedDatasets
  );

  const {
    data = [],
    totalPages = 1,
    currentPage = 1,
    limit = 10,
    loadingDetail,
    totalData = 0,
    topicCounts = {},
  } = useSelector((state) => state.preprocessedDatasetDetail);

  const [editingIndex, setEditingIndex] = useState(null);
  const [newPreprocessedContent, setNewPreprocessedContent] = useState('');
  const [newLabel, setNewLabel] = useState('');
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [newContent, setNewContent] = useState('');
  const [newTopic, setNewTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

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

  const handleEdit = (index, currentTopic, currentPreprocessedContent) => {
    setEditingIndex(index);
    setNewLabel(currentTopic);
    setNewPreprocessedContent(currentPreprocessedContent);
  };

  const handleSave = (index) => {
    dispatch(
      asyncUpdatePreprocessedData(
        selectedPreprocessedDataset,
        index,
        newLabel,
        newPreprocessedContent
      )
    );
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

  const handleDatasetSelection = (event) => {
    const datasetId = event.target.value;
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
      {!selectedDataset ? (
        <p>Please select a raw dataset first to view its preprocessed datasets.</p>
      ) : preprocessedDatasets.length === 0 ? (
        <div className='no-preprocessed-dataset'>
          <h3 className='no-preprocessed-dataset-title'>Dataset Has Not Been Preprocessed</h3>
          <p className='no-preprocessed-dataset-text'>
            You can preprocess the raw dataset by clicking the button below.
          </p>
          <button className='preprocess-btn' onClick={handlePreprocess}>
            Preprocess
          </button>
        </div>
      ) : (
        <>
          {selectedPreprocessedDataset ? (
            <>
              {selectedPreprocessedDataset === selectedDataset ? (
                <button className='prprocess-popup-button' onClick={handleCopyDataset}>
                  Copy Dataset to Edit
                </button>
              ) : (
                <button
                  className='prprocess-popup-button'
                  onClick={() => setShowAddPopup(!showAddPopup)}
                >
                  Add Data
                </button>
              )}

              <PreprocessTable
                dataset={data}
                editingIndex={editingIndex}
                newLabel={newLabel}
                setNewLabel={setNewLabel}
                handleEdit={handleEdit}
                newPreprocessedContent={newPreprocessedContent}
                setNewPreprocessedContent={setNewPreprocessedContent}
                handleSave={handleSave}
                handleDelete={handleDelete}
                preprocessedDatasetId={selectedPreprocessedDataset}
                rawDatasetId={selectedDataset}
                loading={loading}
                preprocessedDatasets={preprocessedDatasets}
                selectedPreprocessedDataset={selectedPreprocessedDataset}
                handleDatasetSelection={handleDatasetSelection}
                isLoading={isLoading}
                totalData={totalData}
                setShowInfo={setShowInfo}
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
            <div className='dataset-container-not-selected'>
              <div className='not-selected-list-dataset'>
                {preprocessedDatasets.length > 0 && (
                  <DatasetSelect
                    datasets={preprocessedDatasets}
                    selectedDataset={selectedPreprocessedDataset}
                    handleDatasetSelection={handleDatasetSelection}
                    loading={isLoading}
                  />
                )}
              </div>
              <div className='not-selected-upload'>
                <p>Silakan pilih salah satu preprocessed dataset.</p>
              </div>
            </div>
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
