import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pages from '../components/styled/Pages';
import Pagination from '../components/Base/Pagination';
import TfidfTable from '../components/page-comps/Tfidf-Page/TfidfTable';
import { fetchTfidfStats } from '../states/vectorized/thunk';
import { resetTfidfStats } from '../states/vectorized/action';
import PopupModalInfoModel from '../components/page-comps/Tfidf-Page/PopupModalInfoModel';
import Loading from '../components/Base/LoadingBar';

const TfidfPage = () => {
  const dispatch = useDispatch();
  const firstrun = useRef(true);
  const [loading, setLoading] = React.useState(true);
  const [showInfo, setShowInfo] = React.useState(false);

  const modelId = useSelector((state) => state.models.selectedModelId);
  const { data, totalPages, currentPage, limit, totalData } = useSelector(
    (state) => state.vectorized
  );

  useEffect(() => {
    if (firstrun.current) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      firstrun.current = false;
      return;
    }
    if (!modelId) {
      dispatch(resetTfidfStats());
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      return;
    }
    const loadData = async () => {
      await dispatch(fetchTfidfStats(modelId));
    };

    loadData();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [dispatch, modelId]);

  const handleSetPage = async (page) => {
    if (modelId) {
      await dispatch(fetchTfidfStats(modelId, page, limit));
    }
  };

  return (
    <Pages>
      {loading && <Loading page='admin-home' />}
      <TfidfTable
        data={data}
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
