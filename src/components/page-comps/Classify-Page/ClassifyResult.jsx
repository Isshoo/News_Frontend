import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../../Base/LoadingBar';
import { motion } from 'framer-motion';

const ClassifyResult = ({ preprocessedText, hybridPredict, deepseekPredict, loading, idx }) => {
  return (
    <motion.div
      className='chat-container'
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0, ease: 'easeOut' }}
    >
      <div className='chat-bubble user-msg'>
        <p>{preprocessedText}</p>
      </div>
      <div className='chat-bubble ai-msg'>
        {!hybridPredict || !deepseekPredict ? (
          <h4>Classifying...</h4>
        ) : (
          <>
            <p>
              <strong>Hybrid:</strong> {hybridPredict}
            </p>
            <p>
              <strong>Deepseek:</strong> {deepseekPredict}
            </p>
          </>
        )}
      </div>
    </motion.div>
  );
};

ClassifyResult.propTypes = {
  preprocessedText: PropTypes.string,
  hybridPredict: PropTypes.string,
  deepseekPredict: PropTypes.string,
  loading: PropTypes.bool,
  idx: PropTypes.number,
};

export default ClassifyResult;
