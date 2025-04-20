import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const PopupModalInfoModel = ({ onClose }) => {
  return (
    <div className='popup-overlay-dataset-info'>
      <div className='popup-modal-dataset-info'>
        <button className='popup-close-dataset-info' onClick={onClose}>
          &times;
        </button>
        <h2>Tabel Information</h2>
        <p className='tfidf-info'>
          This table displays the TF-IDF (Term Frequency-Inverse Document Frequency) statistics for
          the selected model. Each row represents a term in the dataset, and the columns provide
          various metrics related to that term.
        </p>
        <table className='dataset-info-table'>
          <colgroup>
            <col style={{ width: '25%' }} />
            <col style={{ width: '75%' }} />
          </colgroup>
          <thead>
            <tr>
              <th>Column</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Word</strong>
              </td>
              <td>The term or word being analyzed.</td>
            </tr>
            <tr>
              <td>
                <strong>DF</strong>
              </td>
              <td>Document Frequency</td>
            </tr>
            <tr>
              <td>
                <strong>DF Ratio</strong>
              </td>
              <td>Document Frequency Ratio</td>
            </tr>
            <tr>
              <td>
                <strong>TF Avg</strong>
              </td>
              <td>Average Term Frequency</td>
            </tr>
            <tr>
              <td>
                <strong>IDF</strong>
              </td>
              <td>Inverse Document Frequency</td>
            </tr>
            <tr>
              <td>
                <strong>TF-IDF Avg</strong>
              </td>
              <td>Average Term Frequency-Inverse Document Frequency</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

PopupModalInfoModel.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default PopupModalInfoModel;
