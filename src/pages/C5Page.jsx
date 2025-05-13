import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWordStats } from '../states/c5/thunk';
import { resetC5Stats } from '../states/c5/action';
import Pages from '../components/styled/Pages';
import Pagination from '../components/Base/Pagination';
import C5Table from '../components/page-comps/C5-Page/C5Table';
import PopupModalInfoModel from '../components/page-comps/C5-Page/PopupModalInfoModel';
import Loading from '../components/Base/LoadingBar';

const C5Page = () => {
  const dispatch = useDispatch();
  const firstrun = useRef(true);
  const [loading, setLoading] = React.useState(true);
  const [showInfo, setShowInfo] = React.useState(false);

  const modelId = useSelector((state) => state.models.selectedModelId);
  const { data, initialEntropy, currentPage, totalPages, limit, totalData } = useSelector(
    (state) => state.c5
  );

  useEffect(() => {
    if (!modelId) {
      dispatch(resetC5Stats());
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      return;
    }

    const loadData = async () => {
      await dispatch(fetchWordStats(modelId));
    };

    loadData();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [dispatch, modelId]);

  const handleSetPage = async (page) => {
    if (modelId) await dispatch(fetchWordStats(modelId, page, limit));
  };

  return (
    <Pages>
      {loading && <Loading page='admin-home' />}
      <C5Table
        data={data}
        initialEntropy={initialEntropy}
        modelId={modelId}
        totalData={totalData}
        currentPage={currentPage}
        limit={limit}
        setShowInfo={setShowInfo}
      />
      {totalData === 0 ? (
        ''
      ) : (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={handleSetPage}
        />
      )}
      {showInfo && <PopupModalInfoModel onClose={() => setShowInfo(false)} />}
    </Pages>
  );
};

export default C5Page;
