import React from 'react';
import PropTypes from 'prop-types';
import ModelSelect from '../../Base/ModelSelect';
import { MdInfoOutline } from 'react-icons/md';

const TfidfTable = ({ data, loading, modelId, totalData, currentPage, limit, setShowInfo }) => {
  const renderTableBody = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan='7' className='center-text'>
            Loading TF-IDF data...
          </td>
        </tr>
      );
    }

    if (!modelId) {
      return (
        <tr>
          <td colSpan='7' className='center-text'>
            Please select a model to view TF-IDF data.
          </td>
        </tr>
      );
    }

    if (!data || data.length === 0) {
      return (
        <tr>
          <td colSpan='7' className='center-text'>
            No TF-IDF data available.
          </td>
        </tr>
      );
    }

    return data.map((item, idx) => (
      <tr key={idx} className='text-center'>
        <td className='numbering'>{(currentPage - 1) * limit + idx + 1}</td>
        <td>{item.word}</td>
        <td>{item.df}</td>
        <td>{item.df_ratio.toFixed(4)}</td>
        <td>{item.tf_avg.toFixed(4)}</td>
        <td>{item.idf.toFixed(4)}</td>
        <td>{item.tfidf_avg.toFixed(4)}</td>
      </tr>
    ));
  };

  return (
    <div className='tfidf-table'>
      <div className='dataset-table-header'>
        <div className='dataset-select-upload'>
          <h2>TF-IDF Table:</h2>
          <ModelSelect />
        </div>
        <div className='dataset-table-header-info'>
          <p>
            <strong>Total Data: {totalData}</strong>
          </p>
          <button className='tfidf-icon' onClick={() => setShowInfo(true)}>
            <MdInfoOutline className='info-icon' />
          </button>
        </div>
      </div>

      <table className='dataset-info-table'>
        <colgroup>
          <col style={{ width: '5%' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: '15%' }} />
        </colgroup>
        <thead>
          <tr>
            <th>No</th>
            <th>Word</th>
            <th>DF</th>
            <th>DF Ratio</th>
            <th>TF Avg</th>
            <th>IDF</th>
            <th>TF-IDF Avg</th>
          </tr>
        </thead>
        <tbody>{renderTableBody()}</tbody>
      </table>
    </div>
  );
};

TfidfTable.propTypes = {
  data: PropTypes.array.isRequired,
  modelId: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  totalData: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  setShowInfo: PropTypes.func.isRequired,
};

export default TfidfTable;
