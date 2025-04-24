import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { LocaleProvider } from './contexts/LocaleContext';
import { ThemeProvider } from './contexts/ThemeContext';
import LandingPage from './pages/LandingPage';
import ClassifyPage from './pages/ClassifyPage';
import CsvClassifierPage from './pages/CsvClassifierPage';
import DataCollectingPage from './pages/DataCollectingPage';
import PreprocessingPage from './pages/PreprocessingPage';
import ParametersPage from './pages/ParametersPage';
import TfidfPage from './pages/TfidfPage';
import C5Page from './pages/C5Page';
import KNNPage from './pages/KNNPage';
import PredictResultsPage from './pages/PredictResultsPage';
import EvaluationPage from './pages/EvaluationPage';
import DatasetsPage from './pages/DatasetsPage';
import ModelsPage from './pages/ModelsPage';
import NotFoundPage from './pages/NotFoundPage';
import useLocale from './hooks/useLocale';
import useTheme from './hooks/useTheme';
import HeaderBar from './components/Base/HeaderBar';
import FooterBar from './components/Base/FooterBar';
import NavigationBar from './components/Base/NavigationBar';
import TrainModelNavigation from './components/Base/TrainModelNavigation';
import SideBar from './components/Base/SideBar';
import ScrollToTop from './components/Base/ScrollToTop';
import { useLocation } from 'react-router-dom';

const App = () => {
  const [theme, themeContextValue] = useTheme();
  const [locale, localeContextValue] = useLocale();
  const navigate = useNavigate();
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
            {location.pathname.startsWith('/admin') && <SideBar />}

            <main className={location.pathname.startsWith('/user') ? 'user-main' : ''}>
              <ScrollToTop />
              {(location.pathname.startsWith('/user/home') ||
                location.pathname.startsWith('/admin/home')) && <NavigationBar />}

              <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/user/home' element={<ClassifyPage />} />
                <Route path='/user/home/text' element={<ClassifyPage />} />
                <Route path='/user/home/csv' element={<CsvClassifierPage />} />
                <Route path='/admin/home' element={<DataCollectingPage />} />
                <Route path='/admin/home/data-collecting' element={<DataCollectingPage />} />
                <Route path='/admin/home/preprocessing' element={<PreprocessingPage />} />
                <Route path='/admin/home/parameters' element={<ParametersPage />} />
                <Route path='/admin/home/tfidf' element={<TfidfPage />} />
                <Route path='/admin/home/c5' element={<C5Page />} />
                <Route path='/admin/home/knn' element={<KNNPage />} />
                <Route path='/admin/home/predict-results' element={<PredictResultsPage />} />
                <Route path='/admin/home/evaluation' element={<EvaluationPage />} />
                <Route path='/admin/datasets' element={<DatasetsPage />} />
                <Route path='/admin/models' element={<ModelsPage />} />
                <Route path='*' element={<NotFoundPage />} />
              </Routes>

              {location.pathname.startsWith('/admin/home') && <TrainModelNavigation />}
            </main>
          </div>
        </div>
      </ThemeProvider>
    </LocaleProvider>
  );
};

export default App;
