import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LocaleConsumer } from '../../contexts/LocaleContext';
import { MdOutlineLeaderboard } from 'react-icons/md';
import { GoHome } from 'react-icons/go';

const NavigationBar = () => {
  const location = useLocation();

  if (location.pathname.startsWith('/admin/home')) {
    return (
      <LocaleConsumer>
        {({ locale }) => {
          return (
            <nav className='navigation-bar'>
              <ul className='navigation'>
                <li>
                  <Link
                    className={`nav-button ${location.pathname === '/admin/home/data-collecting' || location.pathname === '/admin/home' ? 'active' : ''}`}
                    to='/admin/home/data-collecting'
                  >
                    <p>{locale === 'EN' ? 'Collect Data' : 'Kumpul Data'}</p>
                  </Link>
                </li>
                <li>&gt;</li>
                <li>
                  <Link
                    className={`nav-button ${location.pathname === '/admin/home/preprocessing' ? 'active' : ''}`}
                    to='/admin/home/preprocessing'
                  >
                    <p>{locale === 'EN' ? 'Preprocessing' : 'Prapemrosesan'}</p>
                  </Link>
                </li>
                <li>&gt;</li>
                <li>
                  <Link
                    className={`nav-button ${location.pathname === '/admin/home/parameters' ? 'active' : ''}`}
                    to='/admin/home/parameters'
                  >
                    <p>{locale === 'EN' ? 'Parameters' : 'Parameter'}</p>
                  </Link>
                </li>
                <li>&gt;</li>
                <li>
                  <Link
                    className={`nav-button ${location.pathname === '/admin/home/tfidf' ? 'active' : ''}`}
                    to='/admin/home/tfidf'
                  >
                    <p>{locale === 'EN' ? 'TF-IDF' : 'TF-IDF'}</p>
                  </Link>
                </li>
                <li>&gt;</li>
                <li>
                  <Link
                    className={`nav-button ${location.pathname === '/admin/home/c5' ? 'active' : ''}`}
                    to='/admin/home/c5'
                  >
                    <p>{locale === 'EN' ? 'C5' : 'C5'}</p>
                  </Link>
                </li>
                <li>&gt;</li>
                <li>
                  <Link
                    className={`nav-button ${location.pathname === '/admin/home/knn' ? 'active' : ''}`}
                    to='/admin/home/knn'
                  >
                    <p>{locale === 'EN' ? 'KNN' : 'KNN'}</p>
                  </Link>
                </li>
                <li>&gt;</li>
                <li>
                  <Link
                    className={`nav-button ${location.pathname === '/admin/home/evaluation' ? 'active' : ''}`}
                    to='/admin/home/evaluation'
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
  if (location.pathname.startsWith('/user/home')) {
    return (
      <LocaleConsumer>
        {({ locale }) => {
          return (
            <nav className='navigation-bar user-nav'>
              <ul className='navigation'>
                <li>
                  <Link
                    className={`nav-button ${location.pathname === '/user/home' || location.pathname === '/user/home/text' ? 'active' : ''}`}
                    to='/user/home/text'
                  >
                    <div className='nav-link-con'>
                      <GoHome className='nav-icon' />
                      <p>{locale === 'EN' ? 'Home' : 'Beranda'}</p>
                    </div>
                  </Link>
                </li>
                <li>||</li>
                <li>
                  <Link
                    className={`nav-button ${location.pathname === '/user/home/csv' ? 'active' : ''}`}
                    to='/user/home/csv'
                  >
                    <div className='nav-link-con'>
                      <MdOutlineLeaderboard className='nav-icon' />
                      <p>{locale === 'EN' ? 'CSV Classifier' : 'Klasifikasi CSV'}</p>
                    </div>
                  </Link>
                </li>
              </ul>
            </nav>
          );
        }}
      </LocaleConsumer>
    );
  }

  return null;
};

export default NavigationBar;
