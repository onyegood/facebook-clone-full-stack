import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove('user');
    dispatch({ type: 'LOGOUT' });
    navigate('/auth/login');
  };

  return { logout };
};
