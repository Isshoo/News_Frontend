import React, { useContext } from 'react';
import useInput from '../../../hooks/useInput';
import LocaleContext from '../../../contexts/LocaleContext';
import PropTypes from 'prop-types';

const ClassifyInput = ({ predictNews, loading }) => {
  const [text, onTextChange] = useInput('');
  const { locale } = useContext(LocaleContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    predictNews(text);
  };

  return (
    <form id='threadForm' autoComplete='off' onSubmit={handleSubmit}>
      <div>
        <label htmlFor='title'>{locale === 'EN' ? 'Input News Text' : 'Masukan Teks Berita'}</label>
        <input
          type='text'
          id='title'
          name='title'
          required
          placeholder={locale === 'EN' ? 'Text' : 'Teks'}
          aria-describedby='titleValidation'
          value={text}
          onChange={onTextChange}
        />
      </div>
      <br />
      <button
        className={loading ? 'disabled' : ''}
        type='submit'
        id='threadsSubmit'
        disabled={loading} // Disable tombol jika loading
      >
        {locale === 'EN' ? 'Classify' : 'Klasifikasi'}
      </button>
    </form>
  );
};

ClassifyInput.propTypes = {
  predictNews: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ClassifyInput;
