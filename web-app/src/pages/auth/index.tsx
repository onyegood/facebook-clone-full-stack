import { useState } from 'react';
import Footer from '../../components/auth/Footer';
import LoginForm from '../../components/auth/LoginForm';
import RegisterForm from '../../components/auth/RegisterForm';
import './style.css';

const LoginPage = () => {
  const [isRegister, setIsRegister] = useState<boolean>(false);
  return (
    <div className="login">
      <div className="login_wrapper">
        <LoginForm setIsRegister={setIsRegister} />
        {isRegister && <RegisterForm setIsRegister={setIsRegister} />}
        <Footer />
      </div>
    </div>
  );
};

export default LoginPage;
