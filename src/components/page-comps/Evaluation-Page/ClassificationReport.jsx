import React from 'react';
import PropTypes from 'prop-types';
import { mapLabelResult } from '../../../utils/helper';

const ClassificationReport = ({ classificationReport }) => {
  if (!classificationReport) return <p>No classification report available.</p>;

  const accuracy = classificationReport.accuracy?.toFixed(2);

  const rows = Object.entries(classificationReport)
    .filter(([label]) => label !== 'accuracy' && !label.includes('avg'))
    .map(([label, metrics]) => ({
      label: mapLabelResult(label),
      precision: metrics.precision.toFixed(2),
      recall: metrics.recall.toFixed(2),
      f1: metrics['f1-score'].toFixed(2),
      support: metrics.support,
    }));

  return (
    <div className='classification-report'>
      <h3>Classification Report</h3>
      {accuracy && (
        <p>
          <strong>Accuracy:</strong> {accuracy}
        </p>
      )}
      <table className='report-table'>
        <thead>
          <tr>
            <th>Label</th>
            <th>Precision</th>
            <th>Recall</th>
            <th>F1-Score</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx}>
              <td>{row.label}</td>
              <td>{row.precision}</td>
              <td>{row.recall}</td>
              <td>{row.f1}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ClassificationReport.propTypes = {
  classificationReport: PropTypes.object.isRequired,
};

export default ClassificationReport;
