import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNeighbors } from '../states/knn/thunk';
import Pages from '../components/styled/Pages';
import Pagination from '../components/Base/Pagination';
import KNNGroup from '../components/page-comps/KNN-Page/KNNGroup';
import { asyncFetchModelDetail } from '../states/modelDetail/thunk';
import ModelSelect from '../components/Base/ModelSelect';
import { MdInfoOutline } from 'react-icons/md';
import PopupModalInfoModel from '../components/page-comps/KNN-Page/PopupModalInfoModel';
import { resetNeighbors } from '../states/knn/action';
import Loading from '../components/Base/LoadingBar';

const KNNPage = () => {
  const dispatch = useDispatch();
  const firstrun = useRef(true);

  const { selectedModelId } = useSelector((state) => state.models);
  const { data, currentPage, totalPages, limit, totalData } = useSelector((state) => state.knn);

  const [n_neighbors, setNNeighbors] = useState(5);
  const [loading, setLoading] = useState(true);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    if (firstrun.current) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      firstrun.current = false;
      return;
    }
    if (!selectedModelId) {
      dispatch(resetNeighbors());
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      return;
    }

    const fetchData = async () => {
      const result = await dispatch(asyncFetchModelDetail(selectedModelId));
      if (!result.error) {
        setNNeighbors(result.n_neighbors);
        await dispatch(fetchNeighbors(selectedModelId, 1, result.n_neighbors));
      } else {
        dispatch(resetNeighbors());
      }
    };

    fetchData();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [dispatch, selectedModelId]);

  const handleSetPage = async (page) => {
    if (selectedModelId) await dispatch(fetchNeighbors(selectedModelId, page, n_neighbors));
  };

  // Kelompokkan berdasarkan test_index
  const groupedData = data.reduce((acc, item) => {
    if (!acc[item.test_index]) {
      acc[item.test_index] = {
        test_text: item.test_text,
        true_label: item.true_label,
        predicted_label: item.predicted_label,
        neighbors: [],
      };
    }
    acc[item.test_index].neighbors.push(item);
    return acc;
  }, {});

  const hasData = Object.keys(groupedData).length > 0;

  return (
    <Pages>
      {loading && <Loading page='admin-home' />}
      <div className='knn-page'>
        <div className='dataset-table-header'>
          <div className='dataset-select-upload'>
            <h2>KNN Table:</h2>
            <ModelSelect />
          </div>
          <div className='dataset-table-header-info'>
            <p>
              <strong>{totalPages === 1 ? 'Total Data: 0' : `Total Data: ${totalPages}`}</strong>
            </p>
            <button className='tfidf-icon' onClick={() => setShowInfo(true)}>
              <MdInfoOutline className='info-icon' />
            </button>
          </div>
        </div>
        <div className='knn-group'>
          {loading && <p>Loading neighbors...</p>}

          {!loading && !selectedModelId && (
            <p>Please select a model first to view its neighbors data.</p>
          )}

          {!loading && selectedModelId && !hasData && <p>No KNN data available.</p>}

          {!loading && selectedModelId && hasData && (
            <>
              {Object.entries(groupedData).map(([index, group]) => (
                <KNNGroup key={index} group={group} index={Number(index)} />
              ))}
            </>
          )}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={handleSetPage}
        />
        {showInfo && <PopupModalInfoModel onClose={() => setShowInfo(false)} />}
      </div>
    </Pages>
  );
};

export default KNNPage;
