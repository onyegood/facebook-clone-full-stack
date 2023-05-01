import axios from 'axios';
import * as Yup from 'yup';
import { Form, Formik, FormikProps } from 'formik';
import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import InputField from '../elements/input-field';
import { Link } from 'react-router-dom';

type ChangePasswordProps = {
  password: string;
  confirm_password: string;
};

const ChangePassword = () => {
  const [error, setError] = useState<string>('');

  const dispatch = useDispatch();

  // const navigate = useNavigate();
  const initialValues: ChangePasswordProps = {
    password: '',
    confirm_password: '',
  };
  const [userInput, setUserInput] = useState(initialValues);
  const { password, confirm_password } = userInput;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const UserInputValidation = Yup.object({
    password: Yup.string().required('Password is required.'),
    confirm_password: Yup.string().required('Password is required.'),
  });

  const submitChangePassword = async (values: ChangePasswordProps) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/reset-password`,
        values
      );
      setError('');
      const { message, ...rest } = data;
      setTimeout(() => {
        dispatch({ type: 'RESET', payload: null });
        // Cookies.set('user', JSON.stringify(rest));
        // navigate('/');
      }, 2000);
    } catch (error: any) {
      setError(error.response.data.message);
    }
  };
  return (
    <div className="reset_form">
      <div className="reset_form_header">Change Password</div>
      <div className="reset_form_text">
        Please enter a new password for your account.
      </div>
      <Formik
        enableReinitialize
        initialValues={{ password, confirm_password }}
        validationSchema={UserInputValidation}
        onSubmit={(values) => {
          submitChangePassword(values);
        }}
      >
        {(props: FormikProps<ChangePasswordProps>) => (
          <Form>
            <div className="reset_text_input">
              <InputField
                placeholder="Enter password"
                name="password"
                type="password"
                onChange={handleInputChange}
              />
              <InputField
                placeholder="Confirm password"
                name="confirm_password"
                type="password"
                onChange={handleInputChange}
              />
            </div>

            {error && <div className="error_text">{error}</div>}
            <div className="reset_form_footer">
              <Link to="/auth/login" className="btn btn_gray">
                Cancel
              </Link>
              <button className="btn btn_blue" type="submit">
                Continue
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePassword;
