import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavigationButtons from './NavigationButtons';

const TrainModelNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

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

  const currentIndex = steps.findIndex((step) =>
    Array.isArray(step) ? step.includes(location.pathname) : step === location.pathname
  );

  if (currentIndex === -1) return null;

  const getPath = (step) => (Array.isArray(step) ? step[0] : step);

  const prevPath = currentIndex > 0 ? getPath(steps[currentIndex - 1]) : null;
  const nextPath = currentIndex < steps.length - 1 ? getPath(steps[currentIndex + 1]) : null;

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
};

export default TrainModelNavigation;
