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
        <p className='knn-info-first'>
          <strong>KNN Table</strong> displays the KNN (K-Nearest Neighbors) statistics for the
          selected model. Each row represents a document in the dataset, and the columns provide
          various metrics related to that document.
        </p>
        <p className='knn-info'>
          <strong>Text:</strong> The text content of the document.
        </p>
        <p className='knn-info last'>
          <strong>Nearest Neighbors:</strong>
        </p>
        <table className='dataset-info-table'>
          <colgroup>
            <col style={{ width: '18%' }} />
            <col style={{ width: '82%' }} />
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
                <strong>Index</strong>
              </td>
              <td>The index of the nearest neighbor document in the dataset.</td>
            </tr>
            <tr>
              <td>
                <strong>Text</strong>
              </td>
              <td>The text content of the nearest neighbor document.</td>
            </tr>
            <tr>
              <td>
                <strong>Distance</strong>
              </td>
              <td>The nearest neighbor euclidean distance from the sample document.</td>
            </tr>
            <tr>
              <td>
                <strong>Label</strong>
              </td>
              <td>The label assigned to the nearest neighbor document.</td>
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
