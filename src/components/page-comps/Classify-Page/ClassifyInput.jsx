import React, { useContext, useEffect, useRef } from 'react';
import useInput from '../../../hooks/useInput';
import LocaleContext from '../../../contexts/LocaleContext';
import PropTypes from 'prop-types';
import { ModelSelect } from '../../Base/Select';

const ClassifyInput = ({
  predictNews,
  loading,
  models,
  selectedModelId,
  handleModelChange,
  showFormattedDate,
}) => {
  const [text, onTextChange] = useInput('');
  const { locale } = useContext(LocaleContext);
  const textareaRef = useRef(null);

  // Auto-resize textarea setiap kali teks berubah
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // reset dulu
      textarea.style.height = `${textarea.scrollHeight}px`; // set ulang sesuai isi
    }
  }, [text]);

  const handleSubmit = (event) => {
    event.preventDefault();
    predictNews(text);
  };

  return (
    <form id='threadForm' autoComplete='off' onSubmit={handleSubmit}>
      <div className='input-section'>
        <textarea
          ref={textareaRef}
          id='title'
          name='title'
          required
          placeholder={locale === 'EN' ? 'Write news text here...' : 'Tulis teks berita disini...'}
          aria-describedby='titleValidation'
          value={text}
          onChange={onTextChange}
          rows={1}
          style={{
            resize: 'none',
            overflowY: 'auto',
            maxHeight: '200px',
            minHeight: '42px',
            lineHeight: '1.5',
          }}
        />
      </div>
      <div className='action-section'>
        <div className='model-select-container'>
          <ModelSelect
            models={models}
            selectedModelId={selectedModelId}
            handleModelChange={handleModelChange}
            showFormattedDate={showFormattedDate}
          />
        </div>
        <button
          className={loading ? 'disabled' : ''}
          type='submit'
          id='threadsSubmit'
          disabled={loading}
        >
          {locale === 'EN' ? 'Classify' : 'Klasifikasi'}
        </button>
      </div>
    </form>
  );
};

ClassifyInput.propTypes = {
  predictNews: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  models: PropTypes.array.isRequired,
  selectedModelId: PropTypes.string.isRequired,
  handleModelChange: PropTypes.func.isRequired,
  showFormattedDate: PropTypes.func.isRequired,
};

export default ClassifyInput;
