import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWordStats } from '../states/c5/thunk';
import { resetC5Stats } from '../states/c5/action';
import Pages from '../components/styled/Pages';
import Pagination from '../components/Base/Pagination';
import C5Table from '../components/page-comps/C5-Page/C5Table';

const C5Page = () => {
  const dispatch = useDispatch();
  const firstRender = useRef(true);
  const modelId = useSelector((state) => state.models.selectedModelId);
  const { data, currentPage, totalPages, limit } = useSelector((state) => state.c5);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    dispatch(resetC5Stats());
    if (modelId) dispatch(fetchWordStats(modelId));

    setLoading(false);
  }, [dispatch, modelId]);

  const handleSetPage = (page) => {
    if (modelId) dispatch(fetchWordStats(modelId, page, limit));
  };

  if (!modelId) {
    return (
      <Pages>
        <p>Please select a model to view its C5 data.</p>
      </Pages>
    );
  }

  return (
    <Pages>
      {loading ? (
        <p>Loading C5 data...</p>
      ) : data.length > 0 ? (
        <>
          <C5Table data={data} loading={loading} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={handleSetPage}
          />
        </>
      ) : (
        <p>No C5 data available.</p>
      )}
    </Pages>
  );
};

export default C5Page;
