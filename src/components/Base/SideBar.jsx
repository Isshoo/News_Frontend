import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdOutlineLeaderboard } from 'react-icons/md';
import { GoHome } from 'react-icons/go';
import { LocaleConsumer } from '../../contexts/LocaleContext';

function SideBar() {
  const location = useLocation();

  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <nav className='side-bar'>
            <ul className='side'>
              <li>
                <Link className={`side-button ${location.pathname === '/' ? 'active' : ''}`} to='/'>
                  <GoHome className='side-icon' />
                  <p>{locale === 'EN' ? 'Classifier' : 'Klasifikasi'}</p>
                </Link>
              </li>
              <li>
                <Link
                  className={`side-button ${location.pathname.startsWith('/train-model') ? 'active' : ''}`}
                  to='/train-model'
                >
                  <MdOutlineLeaderboard className='side-icon' />
                  <p>{locale === 'EN' ? 'Train Model' : 'Latih Model'}</p>
                </Link>
              </li>
            </ul>
          </nav>
        );
      }}
    </LocaleConsumer>
  );
}

export default SideBar;
