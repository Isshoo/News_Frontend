import React from 'react';
import { ModelSelect } from '../../Base/Select';
import CsvTable from './CsvTable';
import { showFormattedDate } from '../../../utils/helper';
import PropTypes from 'prop-types';
import Pagination from '../../Base/Pagination';
import { AiOutlineClose } from 'react-icons/ai';
import { RiResetLeftFill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { clearCsvDataAndResult } from '../../../states/classifier/action';

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
  currentPage,
  setCurrentPage,
  rowsPerPage,
  lastRowRef,
}) => {
  const dispatch = useDispatch();

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = csvData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(csvData.length / rowsPerPage);

  const fileInputRef = React.useRef(null);

  const handleReset = () => {
    dispatch(clearCsvDataAndResult());
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleDeletingRow = (index) => {
    handleDeleteRow(index);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

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
              <AiOutlineClose />
            </button>
          )}
        </div>
        <div className='csv-file-upload'>
          <div>
            <input ref={fileInputRef} type='file' accept='.csv' onChange={handleFileUpload} />
            <label htmlFor='file-upload' className='file-upload-label'>
              <span className='file-upload-text'>
                Note: CSV file must have &apos;contentSnippet&apos; column.
              </span>
            </label>
          </div>

          <p className={Number(csvData.length) > 20 ? 'total-data-limit' : ''}>
            <strong>Total Data:</strong> {Number(csvData.length)}{' '}
            {Number(csvData.length) <= 20
              ? `(${20 - Number(csvData.length)} left)`
              : '(Too many data)'}
          </p>
        </div>
        {csvData.length > 0 && (
          <>
            <CsvTable
              csvData={paginatedData}
              handleEditCell={handleEditCell}
              handleDeleteRow={handleDeletingRow}
              startIndex={startIndex}
              lastRowRef={lastRowRef}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </>
        )}
        <div className='csv-actions'>
          <button onClick={handleAddRow} disabled={csvData.length >= 20}>
            Add Data
          </button>
          <div className='csv-actions-right'>
            {csvData.length > 0 && (
              <button
                type='button'
                className='reset-button'
                onClick={handleReset}
                disabled={loading}
              >
                <RiResetLeftFill />
              </button>
            )}
            <button
              onClick={classifyAllCsv}
              disabled={
                loading ||
                csvData.length == 0 ||
                csvData.length > 20 ||
                // untuk setiap data
                csvData.some((row) => row.contentSnippet == '')
              }
            >
              {loading ? 'Classifying...' : 'Classify CSV'}
            </button>
          </div>
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
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  lastRowRef: PropTypes.object.isRequired,
};

export default CsvPopup;
