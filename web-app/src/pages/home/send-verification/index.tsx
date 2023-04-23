import { useCallback, useState } from 'react';
import './style.css';
import { UserInfoType } from '../../../types/user';
import axios from 'axios';

type CreatePostProps = {
  user: UserInfoType;
};

const SendVerification: React.FC<CreatePostProps> = ({ user }) => {
  const [success, setSuccess] = useState<string>('');
  const [error, setError] = useState<string>('');

  const sendVerificationLink = useCallback(async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/sendVerification`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setSuccess(data.message);
    } catch (e: any) {
      setError(e.response.data.message);
    }
  }, [user]);

  return (
    <div className="send_verification">
      <span>
        Your account is not verified, verify your account before it get deleted
        after a month from creation.
      </span>{' '}
      <span className="click_link" onClick={() => sendVerificationLink()}>
        Click here to resend verification link!
      </span>
      {success && <div className="success_text">{success}</div>}
      {error && <div className="error_text">{error}</div>}
    </div>
  );
};

export default SendVerification;
