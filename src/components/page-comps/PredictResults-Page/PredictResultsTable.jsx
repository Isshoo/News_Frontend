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
  currentPage,
  limit,
  setShowInfo,
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
        <td>{item.predict_by === 'KNN Top Label' ? 'K-Nearest Neighbors' : item.predict_by}</td>
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
          <col style={{ width: '54%' }} />
          <col style={{ width: '14%' }} />
          <col style={{ width: '14%' }} />
          <col style={{ width: '18%' }} />
        </colgroup>
        <thead>
          <tr>
            <th>No</th>
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
  currentPage: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  setShowInfo: PropTypes.func.isRequired,
};

export default PredictResultsTable;
