import React from 'react';
import { useNavigate } from 'react-router-dom';
import FooterBar from '../components/Base/FooterBar';
import { GiWorld } from 'react-icons/gi';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className='landing-page'>
        <div className='logo'>
          <GiWorld />
        </div>
        <p className='tagline'>Classify any indonesian news article, faster and easier.</p>
        <div className='landing-buttons'>
          <button onClick={() => navigate('/user/home')}>Use as User</button>
          <button onClick={() => navigate('/admin/home')}>Use as Admin</button>
        </div>
        <div></div>
      </div>
      <footer className='footer'>
        <FooterBar />
      </footer>
    </>
  );
};

export default LandingPage;
