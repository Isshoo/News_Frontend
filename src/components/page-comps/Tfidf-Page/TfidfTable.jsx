import React from 'react';
import PropTypes from 'prop-types';

const TfidfTable = ({ data }) => {
  return (
    <table className='w-full border border-gray-300'>
      <thead className='bg-gray-200'>
        <tr>
          <th className='p-2'>Word</th>
          <th className='p-2'>DF</th>
          <th className='p-2'>DF Ratio</th>
          <th className='p-2'>TF Avg</th>
          <th className='p-2'>IDF</th>
          <th className='p-2'>TF-IDF Avg</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={idx} className='text-center border-t'>
            <td className='p-2'>{item.word}</td>
            <td className='p-2'>{item.df}</td>
            <td className='p-2'>{item.df_ratio.toFixed(4)}</td>
            <td className='p-2'>{item.tf_avg.toFixed(4)}</td>
            <td className='p-2'>{item.idf.toFixed(4)}</td>
            <td className='p-2'>{item.tfidf_avg.toFixed(4)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

TfidfTable.propTypes = {
  data: PropTypes.array.isRequired,
};

export default TfidfTable;
