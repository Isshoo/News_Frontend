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
import { setSelectedPreprocessedDataset } from '../states/preprocessedDatasets/action';

import { setSelectedModel } from '../states/models/action';

import Pages from '../components/styled/Pages';
import Pagination from '../components/Base/Pagination';

import PreprocessTable from '../components/page-comps/Preprocessing-Page/PreprocessTable';
import AddDataPopup from '../components/page-comps/Preprocessing-Page/AddDataPopup';
import AddCopyPopup from '../components/page-comps/Preprocessing-Page/AddCopyPopup';
import PopupModalInfo from '../components/page-comps/Preprocessing-Page/PopupModalInfo';

import { FaPlus } from 'react-icons/fa';
import { MdCopyAll } from 'react-icons/md';
import { resetPreprocessedDatasetDetail } from '../states/preprocessedDatasetDetail/action';
import Loading from '../components/Base/LoadingBar';

const PreprocessingPage = () => {
  const dispatch = useDispatch();
  const firstRun = useRef(true);

  const { selectedDataset, datasets } = useSelector((state) => state.datasets);
  const { selectedPreprocessedDataset, preprocessedDatasets, preprocessLoading } = useSelector(
    (state) => state.preprocessedDatasets
  );

  const {
    data = [],
    totalPages = 1,
    currentPage = 1,
    limit = 10,
    totalData = 0,
    topicCounts = {},
  } = useSelector((state) => state.preprocessedDatasetDetail);

  const [editingIndex, setEditingIndex] = useState(null);
  const [newPreprocessedContent, setNewPreprocessedContent] = useState('');
  const [newLabel, setNewLabel] = useState('');
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showCopyPopup, setShowCopyPopup] = useState(false);
  const [newContent, setNewContent] = useState('');
  const [newTopic, setNewTopic] = useState('');
  const [newCopyName, setNewCopyName] = useState('');

  const [showInfo, setShowInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!selectedDataset) {
      dispatch(resetPreprocessedDatasetDetail());
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return;
    }

    const loadData = async () => {
      await dispatch(asyncFetchPreprocessedDatasets(selectedDataset));
      if (selectedPreprocessedDataset) {
        await dispatch(asyncFetchPreprocessedDatasetDetail(selectedPreprocessedDataset));
      } else {
        dispatch(resetPreprocessedDatasetDetail());
      }
    };
    if (firstRun.current) {
      loadData();
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      firstRun.current = false;
    }
  }, [dispatch, selectedDataset, selectedPreprocessedDataset]);

  const handlePreprocess = async () => {
    await dispatch(asyncPreprocessRawDataset(selectedDataset));
  };

  const handleCopyDataset = async () => {
    await dispatch(asyncCreatePreprocessedCopy(selectedDataset, newCopyName));
    setShowCopyPopup(false);
    setNewCopyName('');
  };

  const handleEdit = (index, currentTopic, currentPreprocessedContent) => {
    setEditingIndex(index);
    setNewLabel(currentTopic);
    setNewPreprocessedContent(currentPreprocessedContent);
  };

  const handleSave = async (index) => {
    await dispatch(
      asyncUpdatePreprocessedData(
        selectedPreprocessedDataset,
        index,
        newLabel,
        newPreprocessedContent
      )
    );
    setEditingIndex(null);
    await dispatch(asyncFetchPreprocessedDatasets(selectedDataset));
  };

  const handleDelete = async (index) => {
    setEditingIndex(null);
    const result = await dispatch(asyncDeletePreprocessedData(selectedPreprocessedDataset, index));
    if (!result?.canceled) {
      await dispatch(asyncFetchPreprocessedDatasets(selectedDataset));
    }
  };

  const handleAddData = async () => {
    await dispatch(asyncAddPreprocessedData(selectedPreprocessedDataset, newContent, newTopic));
    setShowAddPopup(false);
    setNewContent('');
    setNewTopic('');
    await dispatch(asyncFetchPreprocessedDatasets(selectedDataset));
  };

  const handleDatasetSelection = async (event) => {
    const datasetId = event.target.value;
    if (datasetId === selectedPreprocessedDataset) return;
    dispatch(setSelectedPreprocessedDataset(datasetId));
    dispatch(setSelectedModel('', ''));
    await dispatch(asyncFetchPreprocessedDatasetDetail(datasetId, 1, 10));
  };

  const handleDeleteDataset = async () => {
    const result = await dispatch(asyncDeletePreprocessedDataset(selectedPreprocessedDataset));
    if (!result?.canceled) {
      await dispatch(setSelectedPreprocessedDataset(selectedDataset));
      dispatch(setSelectedModel('', ''));
    }
  };

  const handleSetPage = async (page) => {
    if (selectedPreprocessedDataset) {
      await dispatch(asyncFetchPreprocessedDatasetDetail(selectedPreprocessedDataset, page, limit));
    }
  };

  const tableProps = {
    dataset: data,
    editingIndex,
    newLabel,
    setNewLabel,
    handleEdit,
    newPreprocessedContent,
    setNewPreprocessedContent,
    handleSave,
    handleDelete,
    preprocessedDatasetId: selectedPreprocessedDataset,
    rawDatasetId: selectedDataset,
    preprocessedDatasets,
    selectedPreprocessedDataset,
    handleDatasetSelection,
    totalData,
    setShowInfo,
    handleDeleteDataset,
  };

  const renderNoDatasetSelected = () => (
    <>
      <PreprocessTable {...tableProps} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={handleSetPage}
      />
    </>
  );

  const renderNoPreprocessedDataset = () => (
    <>
      <div className='parameters-header'>
        <h2 className='parameters-title'>Preprocessed Dataset</h2>
      </div>
      <div className='upload-area'>
        <div className='no-preprocessed-dataset'>
          <h3 className='no-preprocessed-dataset-title'>Dataset Has Not Preprocessed Yet</h3>
          <p className='no-preprocessed-dataset-text'>
            You can preprocess the raw dataset by clicking the button below.
          </p>
          <button
            className='preprocess-btn'
            onClick={handlePreprocess}
            disabled={preprocessLoading}
            style={{ cursor: preprocessLoading ? 'not-allowed' : 'pointer' }}
            title={
              preprocessLoading
                ? 'Preprocessing in progress. Please wait a few minutes.'
                : 'Preprocess dataset'
            }
          >
            {preprocessLoading ? 'Preprocessing...' : 'Preprocess'}
          </button>
          <div className='upload-note-container'>
            <p className='upload-note'>
              <strong>Note: </strong>
            </p>
            <p className='upload-note'>
              Preprocessing is the process of transforming raw data into a format suitable for
              analysis. It will takes a various techniques to clean and prepare the data, such as{' '}
              <strong>Case Folding, Cleansing, Tokenizing, Stopword Removal, and Stemming</strong>.
            </p>
          </div>
        </div>
      </div>
    </>
  );

  const renderPreprocessedDatasetContent = () => (
    <>
      {showInfo && (
        <PopupModalInfo
          onClose={() => setShowInfo(false)}
          totalData={totalData}
          topicCounts={topicCounts}
          datasets={datasets}
          preprocessedDatasets={preprocessedDatasets}
          selectedDataset={selectedPreprocessedDataset}
        />
      )}

      <div className='preprocessing-body'>
        <PreprocessTable {...tableProps} />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={handleSetPage}
        />
      </div>

      {selectedPreprocessedDataset === selectedDataset ? (
        <>
          <div className='dataset-open-upload'>
            <button
              type='button'
              className='open-upload-btn copy-preprocess'
              onClick={() => setShowCopyPopup(!showCopyPopup)}
            >
              <MdCopyAll />
            </button>
          </div>
          {showCopyPopup && (
            <AddCopyPopup
              newCopyName={newCopyName}
              setNewCopyName={setNewCopyName}
              handleCopyDataset={handleCopyDataset}
              setShowCopyPopup={setShowCopyPopup}
            />
          )}
        </>
      ) : (
        <>
          <div className='dataset-open-upload'>
            <button
              type='button'
              className='open-upload-btn add-preprocess-data'
              onClick={() => setShowAddPopup(!showAddPopup)}
            >
              <FaPlus />
            </button>
          </div>
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
        </>
      )}
    </>
  );

  return (
    <Pages className='preprocessing-page-cuy'>
      {isLoading && <Loading page='admin-home' />}
      {!selectedDataset
        ? renderNoDatasetSelected()
        : preprocessedDatasets.length === 0
          ? renderNoPreprocessedDataset()
          : renderPreprocessedDatasetContent()}
    </Pages>
  );
};

export default PreprocessingPage;
