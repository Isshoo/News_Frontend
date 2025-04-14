import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../../Base/LoadingBar';

const C5Table = ({ data, loading }) => {
  return (
    <div className='c5-table'>
      <h2>C5.0 Table</h2>
      {loading ? (
        <Loading />
      ) : (
        <table className='w-full table-auto border border-gray-300'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='px-4 py-2 border'>Word</th>
              <th className='px-4 py-2 border'>DF</th>
              <th className='px-4 py-2 border'>DF Ratio</th>
              <th className='px-4 py-2 border'>Word Entropy</th>
              <th className='px-4 py-2 border'>Entropy w/o Word</th>
              <th className='px-4 py-2 border'>Information Gain</th>
              <th className='px-4 py-2 border'>Freq per Label</th>
              <th className='px-4 py-2 border'>Top Label</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className='text-center'>
                <td className='border px-4 py-2'>{item.word}</td>
                <td className='border px-4 py-2'>{item.df}</td>
                <td className='border px-4 py-2'>{item.df_ratio.toFixed(4)}</td>
                <td className='border px-4 py-2'>{item.word_entropy?.toFixed(4)}</td>
                <td className='border px-4 py-2'>{item.entropy_without_word?.toFixed(4)}</td>
                <td className='border px-4 py-2'>{item.information_gain?.toFixed(4)}</td>
                <td className='border px-4 py-2 whitespace-pre-wrap'>{item.freq_per_label}</td>
                <td className='border px-4 py-2'>{item.top_label}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

C5Table.propTypes = {
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool,
};

export default C5Table;
