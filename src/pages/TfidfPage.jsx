import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pages from '../components/styled/Pages';
import Pagination from '../components/Base/Pagination';
import TfidfTable from '../components/page-comps/Tfidf-Page/TfidfTable';
import { fetchTfidfStats } from '../states/vectorized/thunk';

const TfidfPage = () => {
  const dispatch = useDispatch();
  const firstRender = useRef(true);
  const [loading, setLoading] = React.useState(true);

  const modelId = useSelector((state) => state.models.selectedModelId);
  const { data, totalPages, currentPage, limit } = useSelector((state) => state.vectorized);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (modelId) {
      dispatch(fetchTfidfStats(modelId, currentPage, limit));
    }

    setLoading(false);
  }, [dispatch, modelId, currentPage, limit]);

  const handleSetPage = (page) => {
    if (modelId) {
      dispatch(fetchTfidfStats(modelId, page, limit));
    }
  };

  return (
    <Pages>
      <h2>TF-IDF Statistics</h2>
      {loading ? (
        <p>Loading...</p>
      ) : data.length > 0 ? (
        <>
          <TfidfTable data={data} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={handleSetPage}
          />
        </>
      ) : (
        <p>No TF-IDF data available for this model.</p>
      )}
    </Pages>
  );
};

export default TfidfPage;
