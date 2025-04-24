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
          <strong>Predict Results Table</strong> displays the predicted results for the trained
          model. Each row represents a document in the dataset, and the columns provide various
          metrics related to that document.
        </p>
        <table className='dataset-info-table'>
          <colgroup>
            <col style={{ width: '30%' }} />
            <col style={{ width: '70%' }} />
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
                <strong>Text</strong>
              </td>
              <td>The text content of the document after preprocessing</td>
            </tr>
            <tr>
              <td>
                <strong>True Label</strong>
              </td>
              <td>The true label of the document</td>
            </tr>
            <tr>
              <td>
                <strong>Predicted Label</strong>
              </td>
              <td>The predicted label of the document</td>
            </tr>
            <tr>
              <td>
                <strong>Predicted By</strong>
              </td>
              <td>The model or rules used to make the prediction</td>
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
