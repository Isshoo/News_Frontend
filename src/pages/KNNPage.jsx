import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNeighbors } from '../states/knn/thunk';
import { resetNeighbors } from '../states/knn/action';
import Pages from '../components/styled/Pages';
import Pagination from '../components/Base/Pagination';
import KNNGroup from '../components/page-comps/KNN-Page/KNNGroup';
import { asyncFetchModelDetail } from '../states/modelDetail/thunk';
import { resetModelDetail } from '../states/modelDetail/action';

const KNNPage = () => {
  const dispatch = useDispatch();
  const firstRender = useRef(true);

  const modelId = useSelector((state) => state.models.selectedModelId);
  const { data, currentPage, totalPages, limit } = useSelector((state) => state.knn);

  const [n_neighbors, setNNeighbors] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    dispatch(resetNeighbors());
    dispatch(resetModelDetail());

    const fetchData = async () => {
      setLoading(true);
      if (modelId) {
        const result = await dispatch(asyncFetchModelDetail(modelId));
        if (!result.error) {
          setNNeighbors(result.n_neighbors);
        }
        await dispatch(fetchNeighbors(modelId, currentPage, result.n_neighbors));
      }
      setLoading(false);
    };

    fetchData();
  }, [dispatch, modelId, currentPage]);

  const handleSetPage = (page) => {
    if (modelId) dispatch(fetchNeighbors(modelId, page, n_neighbors));
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
      <h2>K-Nearest Neighbors</h2>

      {loading && <p>Loading neighbors...</p>}

      {!loading && !modelId && <p>Please select a model first.</p>}

      {!loading && modelId && !hasData && <p>No KNN data available.</p>}

      {!loading && modelId && hasData && (
        <>
          {Object.entries(groupedData).map(([index, group]) => (
            <KNNGroup key={index} group={group} index={Number(index)} />
          ))}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={handleSetPage}
          />
        </>
      )}
    </Pages>
  );
};

export default KNNPage;
