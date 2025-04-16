import React, { useState } from 'react';
import { ModelSelect } from '../../Base/Select';
import CsvTable from './CsvTable';
import { showFormattedDate } from '../../../utils/helper';
import PropTypes from 'prop-types';
import Pagination from '../../Base/Pagination';

const CsvPopup = ({
  models,
  selectedModelId,
  handleModelChange,
  handleFileUpload,
  handleAddRow,
  classifyAllCsv,
  loading,
  csvData,
  handleEditCell,
  handleDeleteRow,
  setIsPopupOpen,
  totalData,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = csvData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(csvData.length / rowsPerPage);

  return (
    <div className={totalData == 0 ? 'csv-popup no-data' : 'csv-popup'}>
      <div className='csv-popup-content'>
        <div className='csv-model-selector'>
          <ModelSelect
            models={models}
            selectedModelId={selectedModelId}
            handleModelChange={handleModelChange}
            showFormattedDate={showFormattedDate}
          />
          {totalData == 0 ? (
            ''
          ) : (
            <button className='csv-popup-overlay' onClick={() => setIsPopupOpen()}>
              X
            </button>
          )}
        </div>
        <div className='csv-file-upload'>
          <input type='file' accept='.csv' onChange={handleFileUpload} />
          <p>
            <strong>Total Data:</strong> {Number(csvData.length)}
          </p>
        </div>
        {csvData.length > 0 && (
          <>
            <CsvTable
              csvData={paginatedData} // ⬅️ pakai data yang sudah dipotong
              handleEditCell={handleEditCell}
              handleDeleteRow={handleDeleteRow}
              startIndex={startIndex}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </>
        )}
        <div className='csv-actions'>
          <button onClick={handleAddRow}>Tambah Data</button>
          <button onClick={classifyAllCsv} disabled={loading}>
            {loading ? 'Processing...' : 'Classify CSV'}
          </button>
        </div>
      </div>
    </div>
  );
};

CsvPopup.propTypes = {
  models: PropTypes.array.isRequired,
  selectedModelId: PropTypes.string.isRequired,
  handleModelChange: PropTypes.func.isRequired,
  handleFileUpload: PropTypes.func.isRequired,
  handleAddRow: PropTypes.func.isRequired,
  classifyAllCsv: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  csvData: PropTypes.array.isRequired,
  handleEditCell: PropTypes.func.isRequired,
  handleDeleteRow: PropTypes.func.isRequired,
  setIsPopupOpen: PropTypes.func.isRequired,
  totalData: PropTypes.number.isRequired,
};

export default CsvPopup;
