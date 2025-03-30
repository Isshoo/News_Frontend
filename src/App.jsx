import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { LocaleProvider } from './contexts/LocaleContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ClassifyPage from './pages/ClassifyPage';
import DataCollectingPage from './pages/DataCollectingPage';
import NotFoundPage from './pages/NotFoundPage';
import useLocale from './hooks/useLocale';
import useTheme from './hooks/useTheme';
import HeaderBar from './components/Base/HeaderBar';
import FooterBar from './components/Base/FooterBar';
import NavigationBar from './components/Base/NavigationBar';
import SideBar from './components/Base/SideBar';
import ScrollToTop from './components/Base/ScrollToTop';

function App() {
  const [theme, themeContextValue] = useTheme();
  const [locale, localeContextValue] = useLocale();
  return (
    <LocaleProvider value={localeContextValue}>
      <ThemeProvider value={themeContextValue}>
        <div
          className='container'
          data-theme={theme === 'dark' ? '' : 'light'}
          data-lang={locale === 'EN' ? '' : 'ID'}
        >
          <header>
            <HeaderBar />
          </header>
          <div className='main'>
            <SideBar />
            <main>
              <ScrollToTop />
              <Routes>
                <Route path='/' element={<ClassifyPage />} />
                <Route path='/data-collecting' element={<DataCollectingPage />} />
                <Route path='*' element={<NotFoundPage />} />
              </Routes>
            </main>
          </div>
          <footer>
            <FooterBar />
          </footer>
        </div>
      </ThemeProvider>
    </LocaleProvider>
  );
}

export default App;
