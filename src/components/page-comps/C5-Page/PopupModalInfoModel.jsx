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
        <p className='c5-info'>
          <strong>C5.0 Table</strong> displays the C5.0 statistics for the selected model. Each row
          represents a word in the dataset, and the columns provide various metrics related to that
          word.
        </p>
        <p className='c5-info'>
          <strong>Initial Entropy:</strong> The initial entropy of the dataset.
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
                <strong>Entropy</strong>
              </td>
              <td>Entropy of the word across all documents</td>
            </tr>
            <tr>
              <td>
                <strong>Entropy w/o</strong>
              </td>
              <td>Entropy of the word across all documents, excluding the current word</td>
            </tr>
            <tr>
              <td>
                <strong>IG</strong>
              </td>
              <td>Information Gain of the word</td>
            </tr>
            <tr>
              <td>
                <strong>Freq per Label</strong>
              </td>
              <td>Frequency of the word per label</td>
            </tr>
            <tr>
              <td>
                <strong>Top Label</strong>
              </td>
              <td>The label with the highest frequency for the word</td>
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
