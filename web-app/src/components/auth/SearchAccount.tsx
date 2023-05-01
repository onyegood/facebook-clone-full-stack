import axios from 'axios';
import * as Yup from 'yup';
import { Form, Formik, FormikProps } from 'formik';
import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import InputField from '../elements/input-field';
import { Link } from 'react-router-dom';

type ResetProps = {
  email: string;
};

const SearchAccount = () => {
  const [error, setError] = useState<string>('');

  const dispatch = useDispatch();

  // const navigate = useNavigate();
  const initialValues: ResetProps = {
    email: '',
  };
  const [userInput, setUserInput] = useState(initialValues);
  const { email } = userInput;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const UserInputValidation = Yup.object({
    email: Yup.string()
      .required('Email address is required.')
      .email('Invalid email.'),
  });

  const submitReset = async (values: ResetProps) => {
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
      <div className="reset_form_header">Find Your Account</div>
      <div className="reset_form_text">
        Please enter your email address or mobile number to search for your
        account.
      </div>
      <Formik
        enableReinitialize
        initialValues={{ email }}
        validationSchema={UserInputValidation}
        onSubmit={(values) => {
          submitReset(values);
        }}
      >
        {(props: FormikProps<ResetProps>) => (
          <Form>
            <div className="reset_text_input">
              <InputField
                placeholder="Email address or phone number"
                name="email"
                type="text"
                onChange={handleInputChange}
              />
            </div>

            {error && <div className="error_text">{error}</div>}
            <div className="reset_form_footer">
              <Link to="/auth/login" className="btn btn_gray">
                Cancel
              </Link>
              <button className="btn btn_blue" type="submit">
                Search
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SearchAccount;
