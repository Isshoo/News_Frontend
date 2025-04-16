import React from 'react';
import { MdOutlineWbSunny, MdSunny } from 'react-icons/md';
import { LocaleConsumer } from '../../contexts/LocaleContext';
import { ThemeConsumer } from '../../contexts/ThemeContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

const HeaderBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogoClick = () => {
    navigate('/');
  };
  return (
    <LocaleConsumer>
      {({ locale, toggleLocale }) => {
        return (
          <ThemeConsumer>
            {({ theme, toggleTheme }) => {
              return (
                <div className='header-bar'>
                  <h1 className='nav-title' onClick={handleLogoClick}>
                    {locale === 'EN' ? 'News Classifier App.' : 'Aplikasi Klasifikasi Berita.'}
                  </h1>
                  <div className='header-buttons'>
                    <div>
                      {location.pathname === '/' ? (
                        ''
                      ) : (
                        <Link to='/'>
                          <button className='logout'>
                            <p>{location.pathname.startsWith('/user') ? 'User' : 'Admin'}</p>{' '}
                            <FiLogOut />
                          </button>
                        </Link>
                      )}
                    </div>
                    <button
                      onClick={toggleTheme}
                      id='toggleThemeBtn'
                      aria-label='Toggle Theme Button'
                    >
                      {theme === 'dark' ? <MdOutlineWbSunny /> : <MdSunny />}
                    </button>
                    {/* <button
                      id='toggleLocaleBtn'
                      onClick={toggleLocale}
                      aria-label='Toggle Locale Button'
                    >
                      {locale === 'EN' ? 'EN' : 'ID'}
                    </button> */}
                  </div>
                </div>
              );
            }}
          </ThemeConsumer>
        );
      }}
    </LocaleConsumer>
  );
};

export default HeaderBar;
