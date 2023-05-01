import { Link } from 'react-router-dom';
import './style.css';
import { useTypedSelector } from '../../../hooks/useSelectorHook';
import { useLogout } from '../../../hooks/useLogout';
import SearchAccount from '../../../components/auth/SearchAccount';
import { useState } from 'react';
import SendEmail from './SendEmail';
import CodeVerification from '../../../components/auth/CodeVerification';
import Footer from '../../../components/auth/Footer';

const ResetPasswordPage = () => {
  const { user } = useTypedSelector((state) => state.users);
  const [visible, setVisible] = useState<number>(2);
  const { logout } = useLogout();

  return (
    <div className="reset">
      <div className="reset_header">
        <img src="../../../icons/facebook.svg" alt="" />
        {user ? (
          <div className="right_reset">
            <Link to="/user/profile">
              <img src={user.image} alt={user.first_name} />
            </Link>
            <button className="btn_blue btn" onClick={() => logout()}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/auth/login" className="right_reset">
            <button className="btn_blue btn">Login</button>
          </Link>
        )}
      </div>
      <div className="reset_wrap">
        {visible === 0 && <SearchAccount />}
        {visible === 1 && <SendEmail {...user} />}
        {visible === 2 && <CodeVerification />}
      </div>
      <Footer />
    </div>
  );
};

export default ResetPasswordPage;
