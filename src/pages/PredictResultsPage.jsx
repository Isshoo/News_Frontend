import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pages from '../components/styled/Pages';
import Pagination from '../components/Base/Pagination';
import PredictResultsTable from '../components/page-comps/PredictResults-Page/PredictResultsTable';
import PopupModalInfoModel from '../components/page-comps/PredictResults-Page/PopupModalInfoModel';
import { fetchPredictResults } from '../states/predictResults/thunk';
import { resetPredictResults } from '../states/predictResults/action';
import Loading from '../components/Base/LoadingBar';

const PredictResultsPage = () => {
  const dispatch = useDispatch();
  const firstrun = useRef(true);
  const [loading, setLoading] = React.useState(true);
  const [showInfo, setShowInfo] = React.useState(false);

  const modelId = useSelector((state) => state.models.selectedModelId);
  const { data, totalPages, currentPage, limit, totalData, totalC5, totalKnn, predictBy } =
    useSelector((state) => state.predictResults);

  useEffect(() => {
    if (firstrun.current) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      firstrun.current = false;
      return;
    }
    if (!modelId) {
      dispatch(resetPredictResults());
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      return;
    }
    const loadData = async () => {
      await dispatch(fetchPredictResults(modelId));
    };

    loadData();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [dispatch, modelId]);

  const handleSetPage = async (page) => {
    if (modelId) {
      await dispatch(fetchPredictResults(modelId, page, limit, predictBy));
    }
  };

  const handleFilterChange = async (e) => {
    const selectedFilter = e.target.value;
    await dispatch(fetchPredictResults(modelId, 1, limit, selectedFilter)); // Fetch filtered data
  };

  return (
    <Pages>
      {loading && <Loading page='admin-home' />}
      <PredictResultsTable
        data={data}
        modelId={modelId}
        loading={loading}
        totalData={totalData}
        totalC5={totalC5}
        totalKnn={totalKnn}
        currentPage={currentPage}
        limit={limit}
        setShowInfo={setShowInfo}
        handleFilterChange={handleFilterChange}
        predictBy={predictBy}
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

export default PredictResultsPage;
