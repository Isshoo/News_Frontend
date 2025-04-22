import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWordStats } from '../states/c5/thunk';
import { resetC5Stats } from '../states/c5/action';
import Pages from '../components/styled/Pages';
import Pagination from '../components/Base/Pagination';
import C5Table from '../components/page-comps/C5-Page/C5Table';
import PopupModalInfoModel from '../components/page-comps/C5-Page/PopupModalInfoModel';

const C5Page = () => {
  const dispatch = useDispatch();
  const firstRender = useRef(true);
  const [loading, setLoading] = React.useState(true);
  const [showInfo, setShowInfo] = React.useState(false);

  const modelId = useSelector((state) => state.models.selectedModelId);
  const { data, currentPage, totalPages, limit, totalData } = useSelector((state) => state.c5);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (modelId) {
      dispatch(fetchWordStats(modelId));
    } else {
      dispatch(resetC5Stats());
    }

    setLoading(false);
  }, [dispatch, modelId]);

  const handleSetPage = (page) => {
    if (modelId) dispatch(fetchWordStats(modelId, page, limit));
  };

  return (
    <Pages>
      <C5Table
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

export default C5Page;
