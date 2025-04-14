import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { LocaleProvider } from './contexts/LocaleContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ClassifyPage from './pages/ClassifyPage';
import CsvClassifierPage from './pages/CsvClassifierPage';
import DataCollectingPage from './pages/DataCollectingPage';
import PreprocessingPage from './pages/PreprocessingPage';
import ParametersPage from './pages/ParametersPage';
import TfidfPage from './pages/TfidfPage';
import C5Page from './pages/C5Page';
import KNNPage from './pages/KNNPage';
import EvaluationPage from './pages/EvaluationPage';
import DatasetsPage from './pages/DatasetsPage';
import ModelsPage from './pages/ModelsPage';
import NotFoundPage from './pages/NotFoundPage';
import useLocale from './hooks/useLocale';
import useTheme from './hooks/useTheme';
import HeaderBar from './components/Base/HeaderBar';
import FooterBar from './components/Base/FooterBar';
import NavigationBar from './components/Base/NavigationBar';
import SideBar from './components/Base/SideBar';
import ScrollToTop from './components/Base/ScrollToTop';
import { useLocation } from 'react-router-dom';

const App = () => {
  const [theme, themeContextValue] = useTheme();
  const [locale, localeContextValue] = useLocale();
  const location = useLocation();
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
              {location.pathname.startsWith('/train-model') ? <NavigationBar /> : ''}
              {location.pathname.startsWith('/classifier') ? <NavigationBar /> : ''}
              {location.pathname === '/' ? <NavigationBar /> : ''}
              <Routes>
                <Route path='/' element={<ClassifyPage />} />
                <Route path='/classifier' element={<ClassifyPage />} />
                <Route path='/classifier/csv' element={<CsvClassifierPage />} />
                <Route path='/train-model' element={<DataCollectingPage />} />
                <Route path='/train-model/data-collecting' element={<DataCollectingPage />} />
                <Route path='/train-model/preprocessing' element={<PreprocessingPage />} />
                <Route path='/train-model/parameters' element={<ParametersPage />} />
                <Route path='/train-model/tfidf' element={<TfidfPage />} />
                <Route path='/train-model/c5' element={<C5Page />} />
                <Route path='/train-model/knn' element={<KNNPage />} />
                <Route path='/train-model/evaluation' element={<EvaluationPage />} />
                <Route path='/datasets' element={<DatasetsPage />} />
                <Route path='/models' element={<ModelsPage />} />
                <Route path='*' element={<NotFoundPage />} />
              </Routes>
            </main>
          </div>
          {/* <footer>
            <FooterBar />
          </footer> */}
        </div>
      </ThemeProvider>
    </LocaleProvider>
  );
};

export default App;
