import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../../Base/LoadingBar';
import { DatasetSelect } from '../../Base/Select';
// info icon from react-icons
import { AiFillInfoCircle } from 'react-icons/ai';
import { MdInfoOutline } from 'react-icons/md';
import { mapLabelResult } from '../../../utils/helper';

const DatasetTable = ({
  data,
  totalData,
  setShowInfo,
  datasets,
  selectedDataset,
  handleDatasetSelection,
}) => {
  return (
    <div className='dataset-table'>
      <div className='dataset-table-header'>
        <div className='dataset-select-upload'>
          <h2>Dataset:</h2>
          <DatasetSelect
            datasets={datasets}
            selectedDataset={selectedDataset}
            handleDatasetSelection={handleDatasetSelection}
          />
        </div>
        <div className='dataset-table-header-info'>
          <p>
            <strong>Total Data: {totalData}</strong>
          </p>
          <button onClick={() => setShowInfo(true)}>
            <MdInfoOutline className='info-icon' />
          </button>
        </div>
      </div>

      <table>
        <colgroup>
          <col style={{ width: '5%' }} />
          <col style={{ width: '83%' }} />
          <col style={{ width: '12%' }} />
        </colgroup>
        <thead>
          <tr>
            <th>ID</th>
            <th>contentSnippet</th>
            <th>topic</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan='3'>No data available, please add a new data or upload a dataset</td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr key={index}>
                <td className='numbering'>{row.index + 1}</td>
                <td className='clamp' title={row.contentSnippet}>
                  {row.contentSnippet}
                </td>
                <td className='center-text'>{mapLabelResult(row.topik)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

DatasetTable.propTypes = {
  data: PropTypes.array.isRequired,
  totalData: PropTypes.number.isRequired,
  setShowInfo: PropTypes.func.isRequired,
  datasets: PropTypes.array.isRequired,
  selectedDataset: PropTypes.string,
  handleDatasetSelection: PropTypes.func.isRequired,
};

export default DatasetTable;
