import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  asyncFetchPreprocessedDatasets,
  asyncPreprocessRawDataset,
  asyncCreatePreprocessedCopy,
  asyncDeletePreprocessedDataset,
  asyncFetchAllPreprocessedDatasets,
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
import { div } from 'framer-motion/client';
import { useNavigate } from 'react-router-dom';

const PreprocessingPage = () => {
  const dispatch = useDispatch();
  const firstRun = useRef(true);
  const navigate = useNavigate();

  const { selectedDataset, datasets } = useSelector((state) => state.datasets);
  const {
    allPreprocessedDatasets,
    selectedPreprocessedDataset,
    preprocessedDatasets,
    preprocessLoading,
  } = useSelector((state) => state.preprocessedDatasets);

  const {
    data = [],
    totalPages = 1,
    currentPage = 1,
    limit = 10,
    totalData = 0,
    filter = 'new',
    fullStats = {},
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
    const loadData = async () => {
      if (!allPreprocessedDatasets.length) {
        const response = await dispatch(asyncFetchAllPreprocessedDatasets());
        // cari dataset dengan id default
        const defaultDataset = response.find((dataset) => dataset.id === 'default');
        if (defaultDataset) {
          dispatch(setSelectedPreprocessedDataset(defaultDataset.id));
          await dispatch(asyncFetchPreprocessedDatasetDetail(1, 10, filter));
        } else {
          dispatch(setSelectedPreprocessedDataset(''));
          dispatch(resetPreprocessedDatasetDetail());
        }
      } else {
        // cari dataset dengan id default
        const defaultDataset = allPreprocessedDatasets.find((dataset) => dataset.id === 'default');
        if (defaultDataset) {
          if (defaultDataset.id !== selectedPreprocessedDataset) {
            dispatch(setSelectedPreprocessedDataset(defaultDataset.id));
            await dispatch(asyncFetchPreprocessedDatasetDetail(1, 10, filter));
          } else {
            await dispatch(asyncFetchPreprocessedDatasetDetail(1, 10, filter));
          }
        } else {
          dispatch(setSelectedPreprocessedDataset(''));
          dispatch(resetPreprocessedDatasetDetail());
        }
      }
    };
    if (firstRun.current) {
      loadData();
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      firstRun.current = false;
    }
  }, [dispatch, allPreprocessedDatasets, selectedPreprocessedDataset, filter]);

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
    await dispatch(asyncUpdatePreprocessedData(index, newLabel, newPreprocessedContent));
    setEditingIndex(null);
  };

  const handleDelete = async (index) => {
    setEditingIndex(null);
    await dispatch(asyncDeletePreprocessedData(index));
  };

  const handleAddData = async () => {
    setEditingIndex(null);
    await dispatch(asyncAddPreprocessedData(selectedPreprocessedDataset, newContent, newTopic));
    setShowAddPopup(false);
    setNewContent('');
    setNewTopic('');
    await dispatch(asyncFetchPreprocessedDatasets(selectedDataset));
  };

  const handleFilterSelection = async (event) => {
    const newFilter = event.target.value;
    if (newFilter === filter) return;
    dispatch(setSelectedModel('', ''));
    await dispatch(asyncFetchPreprocessedDatasetDetail(1, 10, newFilter));
  };

  const handleDeleteDataset = async () => {
    const result = await dispatch(asyncDeletePreprocessedDataset(selectedPreprocessedDataset));
    if (!result?.canceled) {
      await dispatch(setSelectedPreprocessedDataset(selectedDataset));
      dispatch(setSelectedModel('', ''));
    }
  };

  const handleSetPage = async (page) => {
    await dispatch(asyncFetchPreprocessedDatasetDetail(page, limit, filter));
  };

  const handleGoToCollect = () => {
    navigate('/admin/home/data-collecting');
  };

  const renderNoDatasetSelected = () => (
    <>
      <div className='parameters-header'>
        <h2 className='parameters-title'>Preprocessed Dataset</h2>
      </div>
      <div className='upload-area'>
        <div className='no-preprocessed-dataset'>
          <h3 className='no-preprocessed-dataset-title'>Preprocessed Dataset Not Available</h3>
          <p className='no-preprocessed-dataset-text'>
            You can make a new preprocessed dataset by uploading a new dataset in the Collecting
            Page.
          </p>
          <button
            className='preprocess-btn'
            onClick={handleGoToCollect}
            disabled={preprocessLoading}
            style={{ cursor: preprocessLoading ? 'not-allowed' : 'pointer' }}
            title={
              preprocessLoading
                ? 'Creating in progress. Please wait a few minutes.'
                : 'Create preprocess dataset'
            }
          >
            {preprocessLoading ? 'Creating...' : 'Go to Collecting Page'}
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

  const renderNoPreprocessedDataset = () => (
    <div className='preprocessedNew-container'>
      <div className='upload-area'>
        <div className='no-preprocessed-dataset'>
          <h3 className='no-preprocessed-dataset-title'>
            {fullStats.total_unprocessed} New Data Has Not Preprocessed Yet
          </h3>
          <p className='no-preprocessed-dataset-text'>
            You can preprocess the data by clicking the button below.
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
    </div>
  );

  const tableProps = {
    data,
    allPreprocessedDatasets,
    selectedPreprocessedDataset,
    editingIndex,
    newLabel,
    setNewLabel,
    handleEdit,
    newPreprocessedContent,
    setNewPreprocessedContent,
    handleSave,
    handleDelete,
    filter,
    handleFilterSelection,
    totalData,
    setShowInfo,
    renderNoPreprocessedDataset,
    fullStats,
    currentPage,
    limit,
    totalPages,
  };

  const renderPreprocessedDatasetContent = () => (
    <>
      {showInfo && (
        <PopupModalInfo
          onClose={() => setShowInfo(false)}
          totalData={totalData}
          topicCounts={topicCounts}
          preprocessedDatasets={allPreprocessedDatasets}
          selectedDataset={selectedPreprocessedDataset}
          fullStats={fullStats}
        />
      )}

      <div className='preprocessing-body'>
        <PreprocessTable {...tableProps} />

        {(filter === 'new' && fullStats.total_unprocessed > 0) || totalData === 0 ? (
          ''
        ) : (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={handleSetPage}
          />
        )}
      </div>

      {/* {selectedPreprocessedDataset === selectedDataset ? (
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
      )} */}
    </>
  );

  return (
    <Pages className='preprocessing-page-cuy'>
      {isLoading && <Loading page='admin-home' />}
      {allPreprocessedDatasets.length === 0
        ? renderNoDatasetSelected()
        : renderPreprocessedDatasetContent()}
    </Pages>
  );
};

export default PreprocessingPage;
