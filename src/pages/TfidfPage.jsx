import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pages from '../components/styled/Pages';
import Pagination from '../components/Base/Pagination';
import TfidfTable from '../components/page-comps/Tfidf-Page/TfidfTable';
import { fetchTfidfStats } from '../states/vectorized/thunk';
import { resetTfidfStats } from '../states/vectorized/action';
import PopupModalInfoModel from '../components/page-comps/Tfidf-Page/PopupModalInfoModel';

const TfidfPage = () => {
  const dispatch = useDispatch();
  const firstRender = useRef(true);
  const [loading, setLoading] = React.useState(true);
  const [showInfo, setShowInfo] = React.useState(false);

  const modelId = useSelector((state) => state.models.selectedModelId);
  const { data, totalPages, currentPage, limit, totalData } = useSelector(
    (state) => state.vectorized
  );

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (modelId) {
      dispatch(fetchTfidfStats(modelId));
    } else {
      dispatch(resetTfidfStats());
    }

    setLoading(false);
  }, [dispatch, modelId]);

  const handleSetPage = (page) => {
    if (modelId) {
      dispatch(fetchTfidfStats(modelId, page, limit));
    }
  };

  return (
    <Pages>
      <TfidfTable
        data={data}
        loading={loading}
        modelId={modelId}
        totalData={totalData}
        currentPage={currentPage}
        limit={limit}
        setShowInfo={setShowInfo}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={handleSetPage}
      />

      {showInfo && <PopupModalInfoModel onClose={() => setShowInfo(false)} />}
    </Pages>
  );
};

export default TfidfPage;
