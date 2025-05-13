import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pages from '../components/styled/Pages';
import Loading from '../components/Base/LoadingBar';
import DatasetUpload from '../components/page-comps/DataCollecting-Page/DatasetUpload';
import DatasetTable from '../components/page-comps/DataCollecting-Page/DatasetTable';
import PopupModalInfo from '../components/page-comps/DataCollecting-Page/PopupModalInfo';
import Pagination from '../components/Base/Pagination';
import { DatasetSelect } from '../components/Base/Select';
import { asyncAddData, asyncFetchDatasetDetail } from '../states/datasetDetail/thunk';
import { asyncFetchDatasets, asyncUploadDataset } from '../states/datasets/thunk';
import { setSelectedDataset } from '../states/datasets/action';
import { setSelectedModel } from '../states/models/action';
import { setSelectedPreprocessedDataset } from '../states/preprocessedDatasets/action';
import { resetDatasetDetail } from '../states/datasetDetail/action';
import AddDataPopup from '../components/page-comps/Preprocessing-Page/AddDataPopup';
import { FaPlus } from 'react-icons/fa6';

const DataCollectingPage = () => {
  const firstRun = useRef(true);
  const dispatch = useDispatch();
  const [showInfo, setShowInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [showAddPopup, setShowAddPopup] = useState(false);
  const [newContent, setNewContent] = useState('');
  const [newTopic, setNewTopic] = useState('');

  const { datasets, selectedDataset, isUploading } = useSelector((state) => state.datasets);
  const {
    data = [],
    totalData = 0,
    topicCounts = {},
    totalPages = 1,
    currentPage = 1,
    limit = 10,
  } = useSelector((state) => state.datasetDetail);

  useEffect(() => {
    const initialFetch = async () => {
      const response = await dispatch(asyncFetchDatasets());
      const defaultDataset = response.find((dataset) => dataset.id === 'default');
      if (selectedDataset) {
        await dispatch(asyncFetchDatasetDetail(selectedDataset));
      } else if (defaultDataset) {
        dispatch(setSelectedDataset(defaultDataset.id));
        await dispatch(asyncFetchDatasetDetail(defaultDataset.id));
      } else {
        dispatch(setSelectedDataset(''));
        dispatch(resetDatasetDetail());
      }
    };

    if (firstRun.current) {
      initialFetch();
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      firstRun.current = false;
    }
  }, [dispatch, selectedDataset]);

  const handleUpload = async (file) => {
    await dispatch(asyncUploadDataset(file));
  };

  const handleDatasetSelection = (event) => {
    const selectedId = event.target.value;
    if (selectedId === selectedDataset) return;

    dispatch(setSelectedDataset(selectedId));
    dispatch(setSelectedPreprocessedDataset(selectedId));
    dispatch(setSelectedModel('', ''));
    dispatch(asyncFetchDatasetDetail(selectedId, 1, 10));
  };

  const handleAddData = async () => {
    const arrayObjek = [
      {
        contentSnippet: newContent,
        topik: newTopic,
      },
    ];
    await dispatch(asyncAddData(selectedDataset, arrayObjek));
    setShowAddPopup(false);
    setNewContent('');
    setNewTopic('');
    await dispatch(asyncFetchDatasetDetail(selectedDataset));
  };

  const handleSetPage = (page) => {
    if (selectedDataset) {
      dispatch(asyncFetchDatasetDetail(selectedDataset, page, limit));
    }
  };

  return (
    <Pages className='data-collecting-page'>
      {isLoading && <Loading page='admin-home' />}
      {selectedDataset ? (
        <div className='dataset-container-selected'>
          {showInfo && (
            <PopupModalInfo
              onClose={() => setShowInfo(false)}
              totalData={totalData}
              topicCounts={topicCounts}
              datasets={datasets}
              selectedDataset={selectedDataset}
            />
          )}

          <div className='dataset-container-selected-lower'>
            <DatasetTable
              data={data}
              totalData={totalData}
              setShowInfo={setShowInfo}
              datasets={datasets}
              selectedDataset={selectedDataset}
              handleDatasetSelection={handleDatasetSelection}
            />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={handleSetPage}
            />
          </div>
          <>
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
          <DatasetUpload
            onUpload={handleUpload}
            uploading={isUploading}
            selectedDataset={selectedDataset}
            setShowAddPopup={setShowAddPopup}
            showAddPopup={showAddPopup}
          />
        </div>
      ) : (
        <div className='dataset-container-not-selected'>
          <div className='dataset-table-header'>
            <div className='dataset-select-upload'>
              <h2>Dataset:</h2>
              <DatasetSelect
                datasets={datasets}
                selectedDataset={selectedDataset}
                handleDatasetSelection={handleDatasetSelection}
              />
            </div>
          </div>
          <div className='not-selected-upload'>
            <DatasetUpload onUpload={handleUpload} uploading={isUploading} />
          </div>
        </div>
      )}
    </Pages>
  );
};

export default DataCollectingPage;
