import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { LocaleProvider } from './contexts/LocaleContext';
import { ThemeProvider } from './contexts/ThemeContext';
import useLocale from './hooks/useLocale';
import useTheme from './hooks/useTheme';
import HeaderBar from './components/Base/HeaderBar';
import FooterBar from './components/Base/FooterBar';
import NavigationBar from './components/Base/NavigationBar';
import ScrollToTop from './components/Base/ScrollToTop';

function App() {
  const [theme, themeContextValue] = useTheme();
  const [locale, localeContextValue] = useLocale();

  // if (!authUser) {
  //   return (
  //     <LocaleProvider value={localeContextValue}>
  //       <ThemeProvider value={themeContextValue}>
  //         <div
  //           className="container unAuth"
  //           data-theme={theme === 'dark' ? '' : 'light'}
  //           data-lang={locale === 'EN' ? '' : 'ID'}
  //         >
  //           <header>
  //             <HeaderBar />
  //           </header>
  //           <main>
  //             <ScrollToTop />
  //             <Routes>
  //               <Route path="/*" element={<LoginPage />} />
  //               <Route path="/register" element={<RegisterPage />} />
  //             </Routes>
  //           </main>
  //           <footer>
  //             <FooterBar />
  //           </footer>
  //         </div>
  //       </ThemeProvider>
  //     </LocaleProvider>
  //   );
  // }
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
            <NavigationBar />
          </header>
          <main>
            <ScrollToTop />
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </main>
          <footer>
            <FooterBar />
          </footer>
        </div>
      </ThemeProvider>
    </LocaleProvider>
  );
}

export default App;
