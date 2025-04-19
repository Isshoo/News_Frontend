import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../../Base/LoadingBar';
import { DatasetSelect } from '../../Base/Select';
// info icon from react-icons
import { AiFillInfoCircle } from 'react-icons/ai';
import { MdInfoOutline } from 'react-icons/md';

const DatasetTable = ({
  data,
  loading,
  totalData,
  setShowInfo,
  datasets,
  selectedDataset,
  handleDatasetSelection,
  isLoading,
}) => {
  return (
    <div className='dataset-table'>
      <div className='dataset-table-header'>
        <div className='dataset-select-upload'>
          <DatasetSelect
            datasets={datasets}
            selectedDataset={selectedDataset}
            handleDatasetSelection={handleDatasetSelection}
            loading={isLoading}
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
      {loading ? (
        <Loading />
      ) : (
        <>
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
                  <td colSpan='3'>No data available.</td>
                </tr>
              ) : (
                data.map((row, index) => (
                  <tr key={index}>
                    <td>{row.index + 1}</td>
                    <td className='clamp' title={row.contentSnippet}>
                      {row.contentSnippet}
                    </td>
                    <td>{row.topik}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

DatasetTable.propTypes = {
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  totalData: PropTypes.number.isRequired,
  setShowInfo: PropTypes.func.isRequired,
  datasets: PropTypes.array.isRequired,
  selectedDataset: PropTypes.string,
  handleDatasetSelection: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default DatasetTable;
