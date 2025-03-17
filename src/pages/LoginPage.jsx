import React from 'react';
import { Link } from 'react-router-dom';
import LoginInput from '../components/LoginAndRegister-Page/LoginInput';
import { LocaleConsumer } from '../contexts/LocaleContext';
import { useDispatch } from 'react-redux';
import { asyncSetAuthUser } from '../states/authUser/action';
import { GiWorld } from 'react-icons/gi';
import Pages from '../components/styled/Pages';

function LoginPage() {
  const dispatch = useDispatch();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <LocaleConsumer>
      {({ locale }) => {
        if (locale === 'EN') {
          return (
            <Pages>
              <div className="form-container logreg">
                <div className="logo">
                  <GiWorld />
                </div>
                <LoginInput login={onLogin} locale={locale} />
                <p>
                  Don&apos;t have an account? <Link to="/register">Sign up here!</Link>
                </p>
              </div>
            </Pages>
          );
        }
        return (
          <Pages>
            <div className="form-container logreg">
              <div className="logo">
                <GiWorld />
              </div>
              <LoginInput login={onLogin} locale={locale} />
              <p>
                Belum punya akun? <Link to="/register">Registrasi disini!</Link>
              </p>
            </div>
          </Pages>
        );
      }}
    </LocaleConsumer>
  );
}

export default LoginPage;
