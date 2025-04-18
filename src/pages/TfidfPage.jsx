import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pages from '../components/styled/Pages';
import Pagination from '../components/Base/Pagination';
import TfidfTable from '../components/page-comps/Tfidf-Page/TfidfTable';
import { fetchTfidfStats } from '../states/vectorized/thunk';
import { resetTfidfStats } from '../states/vectorized/action';

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

    dispatch(resetTfidfStats());

    if (modelId) {
      dispatch(fetchTfidfStats(modelId));
    }

    setLoading(false);
  }, [dispatch, modelId]);

  const handleSetPage = (page) => {
    if (modelId) {
      dispatch(fetchTfidfStats(modelId, page, limit));
    }
  };

  if (!modelId) {
    return (
      <Pages>
        <p>Please select a model to view its TF-IDF data.</p>
      </Pages>
    );
  }

  return (
    <Pages>
      {loading ? (
        <p>Loading...</p>
      ) : data.length > 0 ? (
        <>
          <TfidfTable data={data} loading={loading} />
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
