import React from 'react';
import PropTypes from 'prop-types';

const ClassificationReport = ({ classificationReport }) => {
  const renderReport = (report) => {
    return Object.entries(report).map(([label, metrics]) => {
      if (label === 'accuracy')
        return (
          <div key={label}>
            <h4>Accuracy</h4>
            <p>{metrics.toFixed(2)}</p>
          </div>
        );

      return (
        <div key={label}>
          <h4>{label}</h4>
          <table>
            <thead>
              <tr>
                <th>Precision</th>
                <th>Recall</th>
                <th>F1-Score</th>
                <th>Support</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{metrics.precision.toFixed(2)}</td>
                <td>{metrics.recall.toFixed(2)}</td>
                <td>{metrics['f1-score'].toFixed(2)}</td>
                <td>{metrics.support}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    });
  };

  return (
    <div>
      <h3>Classification Report</h3>
      {renderReport(classificationReport)}
    </div>
  );
};

ClassificationReport.propTypes = {
  classificationReport: PropTypes.object.isRequired,
};

export default ClassificationReport;
