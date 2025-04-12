import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

import Pages from '../components/styled/Pages';
import ClassifyInput from '../components/page-comps/Classify-Page/ClassifyInput';
import ClassifyResult from '../components/page-comps/Classify-Page/ClassifyResult';

import { classifyNews } from '../states/classifier/thunk';
import { asyncFetchModels } from '../states/models/thunk';
import { setSelectedModel } from '../states/models/action';
import { showFormattedDate } from '../utils/helper';
import { div } from 'framer-motion/client';

const ClassifyPage = () => {
  const dispatch = useDispatch();
  const firstRun = useRef(true);

  const { predictionResults, loading } = useSelector((state) => state.classifier);
  const { models, selectedModelId } = useSelector((state) => state.models);

  const inputAtBottom = !!predictionResults?.length;

  const suggestions = [
    'Pasar Saham Menurun Semenjak Covid-19, Apa Penyebabnya?',
    'Tim Sepak Bola Indonesia Jadi Pemenang Liga Inggris.',
    'Film Spiderman No Way Home yang diperankan Tom Holand Bisa Ditonton di Netflix.',
    'Kemajuan teknologi AI di China semakin menggemparkan dunia.',
    'Makan makanan yang bergizi dapat membantu meningkatkan kesehatan tubuh.',
  ];

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      dispatch(asyncFetchModels());
    }
  }, [dispatch]);

  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [predictionResults]);

  const handleModelChange = (e) => {
    const modelId = e.target.value;
    const foundModel = models.find((model) => model.id === modelId);
    dispatch(setSelectedModel(modelId, foundModel?.model_path || ''));
  };

  const predictNews = (text) => {
    dispatch(classifyNews(text));
  };

  return (
    <Pages>
      <div className='classify-page'>
        <div className='small-page'>
          {/* Input Section di Atas */}
          <AnimatePresence>
            {!inputAtBottom && (
              <>
                <p></p>
                <motion.div
                  className='input-section'
                  key='top-input'
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2>Any news to classify?</h2>
                  <ClassifyInput
                    predictNews={predictNews}
                    loading={loading}
                    models={models}
                    selectedModelId={selectedModelId}
                    handleModelChange={handleModelChange}
                    showFormattedDate={showFormattedDate}
                    suggestions={suggestions}
                    inputAtBottom={inputAtBottom}
                  />
                </motion.div>
                <p></p>
              </>
            )}
          </AnimatePresence>

          {/* Chat Section */}
          <div className='chat-section' ref={chatRef}>
            {predictionResults.map((result, idx) => (
              <ClassifyResult
                key={idx}
                preprocessedText={result.text}
                hybridPredict={result.hybrid}
                deepseekPredict={result.deepseek}
                loading={loading}
                idx={idx}
              />
            ))}
          </div>

          {/* Input Section di Bawah */}
          <AnimatePresence>
            {inputAtBottom && (
              <motion.div
                className='input-section'
                key='bottom-input'
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ClassifyInput
                  predictNews={predictNews}
                  loading={loading}
                  models={models}
                  selectedModelId={selectedModelId}
                  handleModelChange={handleModelChange}
                  showFormattedDate={showFormattedDate}
                  inputAtBottom={inputAtBottom}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Pages>
  );
};

export default ClassifyPage;
