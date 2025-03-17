import React, { useContext, useState } from 'react';
import LocaleContext from '../contexts/LocaleContext';
import Pages from '../components/styled/Pages';
import { predict } from '../utils/api/classifier';
import useInput from '../hooks/useInput';

function HomePage() {
  const { locale } = useContext(LocaleContext);
  const [text, onTextChange] = useInput('');
  const [hybridPredict, setHybridPredict] = useState('');
  const [deepseekPredict, setDeepseekPredict] = useState('');

  async function predictNews() {
    const response = await predict({ text });

    if (response.error) {
      alert(response.error);
      return;
    }
    setHybridPredict(response.hybrid_prediction);
    setDeepseekPredict(response.deepseek_prediction);
  }

  return (
    <Pages>
      <form id='threadForm' autoComplete='off'>
        <div>
          <label htmlFor='title'>
            {locale === 'EN' ? 'Input News Text' : 'Masukan Teks Berita'}
          </label>
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
        <button type='button' id='threadsSubmit' onClick={() => predictNews()}>
          {locale === 'EN' ? 'Classify' : 'Klasifikasi'}
        </button>
      </form>
      <br />
      <div>
        {hybridPredict && <p>Prediksi Hybrid C5.0-KNN : {hybridPredict}</p>}
        {deepseekPredict && <p>Prediksi Deepseek : {deepseekPredict}</p>}
      </div>
    </Pages>
  );
}

export default HomePage;
