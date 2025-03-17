import React from 'react';
import { MdOutlineWbSunny, MdSunny } from 'react-icons/md';
import { LocaleConsumer } from '../../contexts/LocaleContext';
import { ThemeConsumer } from '../../contexts/ThemeContext';

function HeaderBar() {
  return (
    <LocaleConsumer>
      {({ locale, toggleLocale }) => {
        return (
          <ThemeConsumer>
            {({ theme, toggleTheme }) => {
              return (
                <div className='header-bar'>
                  <h1 className='nav-title'>
                    {locale === 'EN' ? 'News Classifier App.' : 'Aplikasi Klasifikasi Berita.'}
                  </h1>
                  <div className='header-buttons'>
                    <button
                      onClick={toggleTheme}
                      id='toggleThemeBtn'
                      aria-label='Toggle Theme Button'
                    >
                      {theme === 'dark' ? <MdOutlineWbSunny /> : <MdSunny />}
                    </button>
                    <button
                      id='toggleLocaleBtn'
                      onClick={toggleLocale}
                      aria-label='Toggle Locale Button'
                    >
                      {locale === 'EN' ? 'EN' : 'ID'}
                    </button>
                  </div>
                </div>
              );
            }}
          </ThemeConsumer>
        );
      }}
    </LocaleConsumer>
  );
}

export default HeaderBar;
