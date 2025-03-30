import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../../Base/LoadingBar';

function ClassifyResult({ preprocessedText, hybridPredict, deepseekPredict, loading }) {
  if (loading) {
    return <Loading />;
  }
  return (
    <div className='result-text'>
      {preprocessedText && <p>Teks berita setelah dipreproses : &quot;{preprocessedText}&quot;</p>}
      {hybridPredict && <p>Prediksi Hybrid C5.0-KNN : {hybridPredict}</p>}
      {deepseekPredict && <p>Prediksi Deepseek : {deepseekPredict}</p>}
    </div>
  );
}

ClassifyResult.propTypes = {
  preprocessedText: PropTypes.string,
  hybridPredict: PropTypes.string,
  deepseekPredict: PropTypes.string,
  loading: PropTypes.bool,
};

export default ClassifyResult;
