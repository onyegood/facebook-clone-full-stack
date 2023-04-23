import './style.css';
import GlobalHeader from '../../components/header';
import LeftSideBar from '../../components/home/left';
import StoriesComponent from '../../components/home/middle/stories';
import RightSidebar from '../../components/home/right';
import { useTypedSelector } from '../../hooks/useSelectorHook';
import { stories } from '../../data/home';
import CreatePost from '../../components/home/middle/post/CreatePost';
import { useCallback, useEffect, useState } from 'react';
import ActivateForm from './ActivateForm';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useParams();
  const { user } = useTypedSelector((state) => state.users);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const activateAccount = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/activate`,
        {
          token,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setSuccess(data.message);
      Cookies.set('user', JSON.stringify({ ...user, verified: true }));
      dispatch({ type: 'VERIFY', payload: true });
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (e: any) {
      setLoading(false);
      setError(e.response.data.message);
    }
  }, [token, user, dispatch, navigate]);

  useEffect(() => {
    // activateAccount();
  }, [activateAccount]);

  return (
    <div className="home">
      {!success && (
        <ActivateForm
          type="success"
          header="Account verification succeeded"
          text={success}
          loading={loading}
        />
      )}
      {error && (
        <ActivateForm
          type="error"
          header="Account verification failed"
          text={error}
          loading={loading}
        />
      )}
      <GlobalHeader user={user} />
      <LeftSideBar user={user} />
      <div className="home_middle">
        <StoriesComponent stories={stories} />
        <CreatePost user={user} />
      </div>
      <RightSidebar user={user} />
    </div>
  );
};

export default HomePage;
