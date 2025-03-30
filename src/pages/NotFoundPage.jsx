import React, { useContext } from 'react';
import LocaleContext from '../contexts/LocaleContext';

const NotFoundPage = () => {
  const { locale } = useContext(LocaleContext);
  return (
    <>
      <div className='notFound-container'>
        <h1>404</h1>
        <p>{locale === 'EN' ? 'Page Not Found' : 'Halaman tidak ditemukan'}</p>
      </div>
    </>
  );
};

export default NotFoundPage;
