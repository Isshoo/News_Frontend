import React from 'react';
import PropTypes from 'prop-types';
import ModelSelect from '../../Base/ModelSelect';
import { MdInfoOutline } from 'react-icons/md';
import { mapLabelResult } from '../../../utils/helper';

const PredictResultsTable = ({
  data,
  loading,
  modelId,
  totalData,
  totalC5,
  totalKnn,
  currentPage,
  limit,
  setShowInfo,
  predictBy,
  handleFilterChange,
}) => {
  const renderTableBody = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan='5' className='center-text'>
            Loading predict results data...
          </td>
        </tr>
      );
    }

    if (!modelId) {
      return (
        <tr>
          <td colSpan='5' className='center-text'>
            Please select a model to view predict results data.
          </td>
        </tr>
      );
    }

    if (!data || data.length === 0) {
      return (
        <tr>
          <td colSpan='5' className='center-text'>
            No predict results data available.
          </td>
        </tr>
      );
    }

    return data.map((item) => (
      <tr key={item.index} className='text-center'>
        <td className='numbering'>{item.index + 1}</td>
        <td className='justify'>{item.text}</td>
        <td>{mapLabelResult(item.true_label)}</td>
        <td>{mapLabelResult(item.predicted_label)}</td>
        <td>{item.predict_by === 'KNN Top Label' ? 'KNN Label Distance' : item.predict_by}</td>
      </tr>
    ));
  };

  return (
    <div className='tfidf-table'>
      <div className='dataset-table-header'>
        <div className='dataset-select-upload'>
          <h2>Results Table:</h2>
          <ModelSelect />
        </div>
        <div className='dataset-table-header-info'>
          <p className='total-data-predict'>
            <strong>
              Total Data:{' '}
              {predictBy === 'c5' ? totalC5 : predictBy === 'knn' ? totalKnn : totalData}
            </strong>
          </p>

          <select
            className='predict-by-filter'
            value={predictBy || ''}
            onChange={handleFilterChange}
          >
            <option value=''>All</option>
            <option value='c5'>C5</option>
            <option value='knn'>KNN</option>
          </select>
          <span></span>
          <button className='tfidf-icon' onClick={() => setShowInfo(true)}>
            <MdInfoOutline className='info-icon' />
          </button>
        </div>
      </div>

      <table className='dataset-info-table'>
        <colgroup>
          <col style={{ width: '6%' }} />
          <col style={{ width: '54%' }} />
          <col style={{ width: '14%' }} />
          <col style={{ width: '14%' }} />
          <col style={{ width: '17%' }} />
        </colgroup>
        <thead>
          <tr>
            <th>Index</th>
            <th>Text</th>
            <th>Actual Label</th>
            <th>Predicted Label</th>
            <th>Predicted By</th>
          </tr>
        </thead>
        <tbody>{renderTableBody()}</tbody>
      </table>
    </div>
  );
};

PredictResultsTable.propTypes = {
  data: PropTypes.array.isRequired,
  modelId: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  totalData: PropTypes.number.isRequired,
  totalC5: PropTypes.number.isRequired,
  totalKnn: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  setShowInfo: PropTypes.func.isRequired,
  predictBy: PropTypes.string,
  handleFilterChange: PropTypes.func.isRequired,
};

export default PredictResultsTable;
