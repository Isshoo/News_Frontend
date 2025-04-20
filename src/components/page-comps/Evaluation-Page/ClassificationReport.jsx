import React from 'react';
import PropTypes from 'prop-types';
import { mapLabelResult } from '../../../utils/helper';

const ClassificationReport = ({ classificationReport }) => {
  const accuracy = classificationReport.accuracy?.toFixed(2);
  const defaultLabels = ['0', '1', '2', '3', '4']; // Ganti sesuai label sebenarnya

  const isEmpty =
    !classificationReport ||
    Object.keys(classificationReport).every((key) => key === 'accuracy' || key.includes('avg'));

  const renderDataRows = () => {
    return Object.entries(classificationReport)
      .filter(([label]) => label !== 'accuracy' && !label.includes('avg'))
      .map(([label, metrics], index) => (
        <tr key={index}>
          <th>{mapLabelResult(label)}</th>
          <td>{metrics.precision.toFixed(2)}</td>
          <td>{metrics.recall.toFixed(2)}</td>
          <td>{metrics['f1-score'].toFixed(2)}</td>
        </tr>
      ));
  };

  const renderEmptyPlaceholder = () => {
    return defaultLabels.map((label, index) => (
      <tr key={label}>
        <th>{mapLabelResult(label)}</th>
        {index === 0 && (
          <td colSpan='3' rowSpan={defaultLabels.length}>
            <em>Classification Report is not available. please select a model first.</em>
          </td>
        )}
      </tr>
    ));
  };

  return (
    <div className='classification-report'>
      <h3>Classification Report</h3>

      <table className='report-table'>
        <colgroup>
          <col style={{ width: '25%' }} />
          <col style={{ width: '25%' }} />
          <col style={{ width: '25%' }} />
          <col style={{ width: '25%' }} />
        </colgroup>
        <thead>
          <tr>
            <th>Label</th>
            <th>Precision</th>
            <th>Recall</th>
            <th>F1-Score</th>
          </tr>
        </thead>
        <tbody>{isEmpty ? renderEmptyPlaceholder() : renderDataRows()}</tbody>
      </table>
    </div>
  );
};

ClassificationReport.propTypes = {
  classificationReport: PropTypes.object.isRequired,
};

export default ClassificationReport;
