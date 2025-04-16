import React from 'react';
import { useNavigate } from 'react-router-dom';
import FooterBar from '../components/Base/FooterBar';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className='landing-page'>
        <div className='logo'>🧠 MyClassifier</div>
        <p className='tagline'>Klasifikasikan data teks Anda dengan mudah dan cepat</p>
        <div className='landing-buttons'>
          <button onClick={() => navigate('/user/home')}>Masuk sebagai User</button>
          <button onClick={() => navigate('/admin/home')}>Masuk sebagai Admin</button>
        </div>
      </div>
      <footer className='footer'>
        <FooterBar />
      </footer>
    </>
  );
};

export default LandingPage;
