import axios from 'axios';
import * as Yup from 'yup';
import { Form, Formik, FormikProps } from 'formik';
import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import InputField from '../elements/input-field';
import { Link } from 'react-router-dom';

type CodeVerificationProps = {
  code: string;
};

const CodeVerification = () => {
  const [error, setError] = useState<string>('');

  const dispatch = useDispatch();

  // const navigate = useNavigate();
  const initialValues: CodeVerificationProps = {
    code: '',
  };
  const [userInput, setUserInput] = useState(initialValues);
  const { code } = userInput;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const UserInputValidation = Yup.object({
    code: Yup.string().required('code address is required.'),
  });

  const submitCodeVerification = async (values: CodeVerificationProps) => {
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
      <div className="reset_form_header">Code Verification</div>
      <div className="reset_form_text">
        Please enter code that been sent to your email
      </div>
      <Formik
        enableReinitialize
        initialValues={{ code }}
        validationSchema={UserInputValidation}
        onSubmit={(values) => {
          submitCodeVerification(values);
        }}
      >
        {(props: FormikProps<CodeVerificationProps>) => (
          <Form>
            <div className="reset_text_input">
              <InputField
                placeholder="code address or phone number"
                name="code"
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
                Continue
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CodeVerification;
