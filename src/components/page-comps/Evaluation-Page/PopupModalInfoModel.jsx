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
        <p className='eval-info'>
          <strong>Confusion Matrix</strong> is a table that summarizes the performance of a
          classification model by comparing the predicted labels with the actual labels.
        </p>
        <p className='eval-info last'>
          <strong>Classification Report</strong> is a table that summarizes the performance of a
          classification model by providing metrics such as precision, recall, F1-score, and support
          for each class.
        </p>
        <table className='dataset-info-table'>
          <colgroup>
            <col style={{ width: '20%' }} />
            <col style={{ width: '80%' }} />
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
                <strong>Accuracy</strong>
              </td>
              <td>
                The ratio of correctly predicted instances to the total instances in the dataset.
              </td>
            </tr>
            <tr>
              <td>
                <strong>Precision</strong>
              </td>
              <td>The ratio of true positives to the total predicted positives.</td>
            </tr>
            <tr>
              <td>
                <strong>Recall</strong>
              </td>
              <td>The ratio of true positives to the total actual positives.</td>
            </tr>
            <tr>
              <td>
                <strong>F1-Score</strong>
              </td>
              <td>The harmonic mean of precision and recall.</td>
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
