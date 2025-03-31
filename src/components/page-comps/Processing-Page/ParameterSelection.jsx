import React from 'react';
import PropTypes from 'prop-types';

const ParameterSelection = ({
  splitSize,
  handleSplitChange,
  trainSize,
  testSize,
  trainPerTopic,
  testPerTopic,
  nNeighbors,
  setNNeighbors,
  loading,
}) => {
  return (
    <div>
      <h3>Set Training Parameters</h3>
      <label>Train-Test Split: </label>
      <select
        value={splitSize}
        onChange={(e) => handleSplitChange(Number(e.target.value))}
        disabled={loading}
      >
        {/* disabled */}
        <option value={0} disabled>
          Select Split Size
        </option>
        <option value={0.5}>50-50</option>
        <option value={0.4}>60-40</option>
        <option value={0.3}>70-30</option>
        <option value={0.2}>80-20</option>
      </select>

      <p>Train Data: {trainSize}</p>
      <p>Train Data Per Topic:</p>
      <ul>
        {trainPerTopic &&
          Object.entries(trainPerTopic).map(([topic, counts]) => (
            <li key={topic}>
              {topic}: {counts}
            </li>
          ))}
      </ul>
      <p>Test Data: {testSize}</p>
      <p>Test Data Per Topic:</p>
      <ul>
        {testPerTopic &&
          Object.entries(testPerTopic).map(([topic, counts]) => (
            <li key={topic}>
              {topic}: {counts}
            </li>
          ))}
      </ul>

      <label>n_neighbors: </label>
      <input
        type='number'
        value={nNeighbors}
        onChange={(e) => setNNeighbors(Number(e.target.value))}
        min='1'
      />
    </div>
  );
};

ParameterSelection.propTypes = {
  splitSize: PropTypes.number.isRequired,
  handleSplitChange: PropTypes.func.isRequired,
  trainSize: PropTypes.number.isRequired,
  testSize: PropTypes.number.isRequired,
  trainPerTopic: PropTypes.object.isRequired,
  testPerTopic: PropTypes.object.isRequired,
  nNeighbors: PropTypes.number.isRequired,
  setNNeighbors: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ParameterSelection;
