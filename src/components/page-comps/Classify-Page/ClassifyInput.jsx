import React, { useContext, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import useInput from '../../../hooks/useInput';
import LocaleContext from '../../../contexts/LocaleContext';
import PropTypes from 'prop-types';
import { ModelSelect } from '../../Base/Select';
import { clearPredictions } from '../../../states/classifier/action';
import { RiResetLeftFill } from 'react-icons/ri';

const ClassifyInput = ({
  predictNews,
  loading,
  models,
  selectedModelId,
  handleModelChange,
  showFormattedDate,
  suggestions = [],
  inputAtBottom,
}) => {
  const dispatch = useDispatch();
  const [text, onTextChange, setText] = useInput('');
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

  const handleSuggestionClick = (suggestion) => {
    setText(suggestion);
    predictNews(suggestion);
  };

  return (
    <>
      <form id='threadForm' autoComplete='off' onSubmit={handleSubmit}>
        <div className='input-section'>
          <textarea
            ref={textareaRef}
            id='title'
            name='title'
            required
            placeholder={
              locale === 'EN' ? 'Write news text here...' : 'Tulis teks berita disini...'
            }
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
          <div className='classify-button-container'>
            {inputAtBottom && (
              <button
                type='button'
                className='reset-button'
                onClick={() => dispatch(clearPredictions())}
              >
                <RiResetLeftFill />
              </button>
            )}
            <button
              className={loading ? 'disabled' : ''}
              type='submit'
              id='threadsSubmit'
              disabled={loading}
            >
              {locale === 'EN' ? 'Classify' : 'Klasifikasi'}
            </button>
          </div>
        </div>
      </form>
      {suggestions.length > 0 && (
        <div className='suggestion-box'>
          {suggestions.map((sug, idx) => (
            <button
              key={idx}
              type='button'
              className='suggestion-item'
              onClick={() => handleSuggestionClick(sug)}
              disabled={loading}
            >
              {sug}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

ClassifyInput.propTypes = {
  predictNews: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  models: PropTypes.array.isRequired,
  selectedModelId: PropTypes.string.isRequired,
  handleModelChange: PropTypes.func.isRequired,
  showFormattedDate: PropTypes.func.isRequired,
  suggestions: PropTypes.array,
  inputAtBottom: PropTypes.bool,
};

export default ClassifyInput;
