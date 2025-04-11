import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LocaleConsumer } from '../../contexts/LocaleContext';

const NavigationBar = () => {
  const location = useLocation();

  if (location.pathname.startsWith('/train-model')) {
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
                    className={`nav-button ${location.pathname === '/train-model/parameters' ? 'active' : ''}`}
                    to='/train-model/parameters'
                  >
                    <p>{locale === 'EN' ? 'Parameters' : 'Parameter'}</p>
                  </Link>
                </li>
                <li>&gt;</li>
                <li>
                  <Link
                    className={`nav-button ${location.pathname === '/train-model/tfidf' ? 'active' : ''}`}
                    to='/train-model/tfidf'
                  >
                    <p>{locale === 'EN' ? 'TF-IDF' : 'TF-IDF'}</p>
                  </Link>
                </li>
                <li>&gt;</li>
                <li>
                  <Link
                    className={`nav-button ${location.pathname === '/train-model/c5' ? 'active' : ''}`}
                    to='/train-model/c5'
                  >
                    <p>{locale === 'EN' ? 'C5' : 'C5'}</p>
                  </Link>
                </li>
                <li>&gt;</li>
                <li>
                  <Link
                    className={`nav-button ${location.pathname === '/train-model/knn' ? 'active' : ''}`}
                    to='/train-model/knn'
                  >
                    <p>{locale === 'EN' ? 'KNN' : 'KNN'}</p>
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
  }
  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <nav className='navigation-bar'>
            <ul className='navigation'>
              <li>
                <Link
                  className={`nav-button ${location.pathname === '/' || location.pathname === '/classifier' ? 'active' : ''}`}
                  to='/classifier'
                >
                  <p>{locale === 'EN' ? 'Text Classification' : 'Klasifikasi Teks'}</p>
                </Link>
              </li>
              <li>||</li>
              <li>
                <Link
                  className={`nav-button ${location.pathname === '/classifier/csv' ? 'active' : ''}`}
                  to='/classifier/csv'
                >
                  <p>{locale === 'EN' ? 'CSV Classification' : 'Klasifikasi CSV'}</p>
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
