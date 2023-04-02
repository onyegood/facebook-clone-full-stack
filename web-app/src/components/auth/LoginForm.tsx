import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';
import { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../elements/input-field';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import axios from 'axios';
import { DotLoader } from 'react-spinners';

interface LoginProps {
  email: string;
  password: string;
}

export type ShowRegisterFormProps = {
  setIsRegister: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoginForm: React.FC<ShowRegisterFormProps> = ({ setIsRegister }) => {
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  const naviagte = useNavigate();

  const initialValues: LoginProps = { email: '', password: '' };
  const [userInput, setUserInput] = useState(initialValues);
  const { email, password } = userInput;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const UserInputValidation = Yup.object({
    email: Yup.string()
      .required('Email address is required.')
      .email('Invalid email.'),
    password: Yup.string()
      .required('Password is a required field')
      .min(5, 'Password must be at least 5 characters'),
  });

  const submitLogin = async (values: LoginProps) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/login`,
        values
      );

      setLoading(false);
      setError('');
      setSuccess(data.message);
      const { message, ...rest } = data;
      setTimeout(() => {
        dispatch({ type: 'LOGIN', payload: rest });
        Cookies.set('user', JSON.stringify(rest));
        naviagte('/');
      }, 2000);
    } catch (error: any) {
      setLoading(false);
      setSuccess('');
      setError(error.response.data.message);
    }
  };
  return (
    <div className="login_wrap">
      <div className="login_1">
        <img src="../../icons/facebook.svg" alt="Facebook logo" />
        <span>
          Facebook help you connect and share with the people in your life.
        </span>
      </div>
      <div className="login_2">
        <div className="login_2_wrap">
          <Formik
            enableReinitialize
            initialValues={{ email, password }}
            validationSchema={UserInputValidation}
            onSubmit={(values, actions) => {
              submitLogin(values);
            }}
          >
            {(props: FormikProps<LoginProps>) => (
              <Form>
                <InputField
                  placeholder="Email address or phone number"
                  name="email"
                  type="text"
                  onChange={handleInputChange}
                />
                <InputField
                  name="password"
                  placeholder="Password"
                  type="password"
                  onChange={handleInputChange}
                  bottom
                />
                <button type="submit" className="btn btn_blue">
                  Log in
                </button>
              </Form>
            )}
          </Formik>
          <Link to="/auth/forget-password" className="forgot_password">
            Forgotten password?
          </Link>
          {error && <div className="error_text">{error}</div>}
          {success && <div className="success_text">{success}</div>}
          <DotLoader color="#1876f2" loading={loading} size={30} />
          <div className="sign_splitter" />
          <button
            className="open_signup btn btn_green"
            onClick={() => setIsRegister(true)}
          >
            Create Account
          </button>
        </div>
        <Link to="/" className="sign_extra">
          <b>Create a Page</b> for a celebrity, brand or business.
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
