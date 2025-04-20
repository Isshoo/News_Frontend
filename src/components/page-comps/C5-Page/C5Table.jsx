import React from 'react';
import PropTypes from 'prop-types';
import ModelSelect from '../../Base/ModelSelect';
import { MdInfoOutline } from 'react-icons/md';

const C5Table = ({ data, loading, modelId, totalData, currentPage, limit, setShowInfo }) => {
  const renderTableBody = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan='9' className='center-text'>
            Loading C5.0 data...
          </td>
        </tr>
      );
    }

    if (!modelId) {
      return (
        <tr>
          <td colSpan='9' className='center-text'>
            Please select a model to view C5.0 data.
          </td>
        </tr>
      );
    }

    if (!data || data.length === 0) {
      return (
        <tr>
          <td colSpan='9' className='center-text'>
            No C5.0 data available.
          </td>
        </tr>
      );
    }

    return data.map((item, index) => (
      <tr key={index} className=''>
        <td className='numbering'>{(currentPage - 1) * limit + index + 1}</td>
        <td>{item.word}</td>
        <td>{item.df}</td>
        <td>{item.df_ratio.toFixed(4)}</td>
        <td>{item.word_entropy?.toFixed(4)}</td>
        <td>{item.entropy_without_word?.toFixed(4)}</td>
        <td>{item.information_gain?.toFixed(4)}</td>
        <td className='left-text'>{item.freq_per_label}</td>
        <td>{item.top_label}</td>
      </tr>
    ));
  };
  return (
    <div className='c5-table'>
      <div className='dataset-table-header'>
        <div className='dataset-select-upload'>
          <h2>C5.0 Table:</h2>
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
          <col style={{ width: '12%' }} />
          <col style={{ width: '7%' }} />
          <col style={{ width: '9.5%' }} />
          <col style={{ width: '9.5%' }} />
          <col style={{ width: '9.5%' }} />
          <col style={{ width: '9.5%' }} />
          <col style={{ width: '27%' }} />
          <col style={{ width: '11%' }} />
        </colgroup>
        <thead>
          <tr>
            <th>No</th>
            <th>Word</th>
            <th>DF</th>
            <th>DF Ratio</th>
            <th>Word Entropy</th>
            <th>Entropy w/o Word</th>
            <th>Information Gain</th>
            <th>Freq per Label</th>
            <th>Top Label</th>
          </tr>
        </thead>
        <tbody>{renderTableBody()}</tbody>
      </table>
    </div>
  );
};

C5Table.propTypes = {
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  modelId: PropTypes.string,
  totalData: PropTypes.number,
  currentPage: PropTypes.number,
  limit: PropTypes.number,
  setShowInfo: PropTypes.func.isRequired,
};

export default C5Table;
