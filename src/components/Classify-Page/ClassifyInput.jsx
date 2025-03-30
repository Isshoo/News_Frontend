import React, { useContext } from 'react';
import useInput from '../../hooks/useInput';
import LocaleContext from '../../contexts/LocaleContext';
import PropTypes from 'prop-types';

function ClassifyInput({ predictNews, loading }) {
  const [text, onTextChange] = useInput('');
  const { locale } = useContext(LocaleContext);

  return (
    <form id='threadForm' autoComplete='off'>
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
        {/* <p id='titleValidation' className='validation-message' aria-live='polite'>
            {locale === 'EN' ? 'Numbers of characters left :' : 'Jumlah karakter tersisa :'}{' '}
            {titleMaxLength - title.length}
          </p> */}
      </div>
      <br />
      <button
        className={loading ? 'disabled' : ''}
        type='button'
        id='threadsSubmit'
        onClick={() => predictNews(text)}
      >
        {locale === 'EN' ? 'Classify' : 'Klasifikasi'}
      </button>
    </form>
  );
}

ClassifyInput.propTypes = {
  predictNews: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ClassifyInput;
