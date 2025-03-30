import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LocaleConsumer } from '../../contexts/LocaleContext';

const NavigationBar = () => {
  const location = useLocation();

  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <nav className='navigation-bar'>
            <ul className='navigation'>
              <li>
                <Link
                  className={`nav-button ${location.pathname === '/train-model/data-collecting' || location.pathname === '/train-model' ? 'active' : ''}`}
                  to='/train-model/data-collecting'
                >
                  <p>{locale === 'EN' ? 'Collect Data' : 'Kumpul Data'}</p>
                </Link>
              </li>
              <li>&gt;</li>
              <li>
                <Link
                  className={`nav-button ${location.pathname === '/train-model/preprocessing' ? 'active' : ''}`}
                  to='/train-model/preprocessing'
                >
                  <p>{locale === 'EN' ? 'Preprocessing' : 'Prapemrosesan'}</p>
                </Link>
              </li>
              <li>&gt;</li>
              <li>
                <Link
                  className={`nav-button ${location.pathname === '/train-model/processing' ? 'active' : ''}`}
                  to='/train-model/processing'
                >
                  <p>{locale === 'EN' ? 'Processing' : 'Pemrosesan'}</p>
                </Link>
              </li>
              <li>&gt;</li>
              <li>
                <Link
                  className={`nav-button ${location.pathname === '/train-model/evaluation' ? 'active' : ''}`}
                  to='/train-model/evaluation'
                >
                  <p>{locale === 'EN' ? 'Evaluation' : 'Evaluasi'}</p>
                </Link>
              </li>
            </ul>
          </nav>
        );
      }}
    </LocaleConsumer>
  );
};

export default NavigationBar;
