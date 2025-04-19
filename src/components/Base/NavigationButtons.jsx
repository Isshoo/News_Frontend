import React from 'react';
import PropTypes from 'prop-types';

const NavigationButtons = ({
  onPrevious,
  onNext,
  disablePrevious = false,
  disableNext = false,
  nextPage = '',
  previousPage = '',
}) => {
  return (
    <div className='navigation-buttons'>
      {disablePrevious ? (
        ''
      ) : (
        <button className='nav-btn prev-btn' onClick={onPrevious} disabled={disablePrevious}>
          <p>
            <span>←</span>
          </p>{' '}
          {previousPage}
        </button>
      )}
      {disableNext ? (
        ''
      ) : (
        <button className='nav-btn next-btn' onClick={onNext} disabled={disableNext}>
          {nextPage}{' '}
          <p>
            <span>→</span>
          </p>
        </button>
      )}
    </div>
  );
};

NavigationButtons.propTypes = {
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  disablePrevious: PropTypes.bool,
  disableNext: PropTypes.bool,
  nextPage: PropTypes.string,
  previousPage: PropTypes.string,
};

export default NavigationButtons;
