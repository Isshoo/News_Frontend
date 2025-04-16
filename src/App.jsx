import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
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
import NavigationButtons from './components/Base/NavigationButtons';
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
            <SideBar />
            <main>
              <ScrollToTop />
              {(location.pathname.startsWith('/train-model') ||
                location.pathname.startsWith('/classifier') ||
                location.pathname === '/') && <NavigationBar />}

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

              {location.pathname.startsWith('/train-model') &&
                (() => {
                  const steps = [
                    ['/train-model', '/train-model/data-collecting'], // group as one step
                    '/train-model/preprocessing',
                    '/train-model/parameters',
                    '/train-model/tfidf',
                    '/train-model/c5',
                    '/train-model/knn',
                    '/train-model/evaluation',
                  ];
                  const labels = [
                    'Collecting Data',
                    'Preprocessing',
                    'Set Parameters',
                    'TF-IDF',
                    'C5',
                    'KNN',
                    'Evaluation',
                  ];

                  // Cari index langkah berdasarkan path sekarang
                  const currentIndex = steps.findIndex((step) =>
                    Array.isArray(step)
                      ? step.includes(location.pathname)
                      : step === location.pathname
                  );

                  if (currentIndex === -1) return null;

                  const getPath = (step) => (Array.isArray(step) ? step[0] : step);

                  const prevPath = currentIndex > 0 ? getPath(steps[currentIndex - 1]) : null;
                  const nextPath =
                    currentIndex < steps.length - 1 ? getPath(steps[currentIndex + 1]) : null;

                  return (
                    <NavigationButtons
                      onPrevious={() => prevPath && navigate(prevPath)}
                      onNext={() => nextPath && navigate(nextPath)}
                      disablePrevious={currentIndex === 0}
                      disableNext={currentIndex === steps.length - 1}
                      previousPage={labels[currentIndex - 1] || ''}
                      nextPage={labels[currentIndex + 1] || ''}
                    />
                  );
                })()}
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
