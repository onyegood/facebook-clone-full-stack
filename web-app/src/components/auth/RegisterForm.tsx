import { Form, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { ChangeEvent, useState } from 'react';
import DotLoader from 'react-spinners/DotLoader';
import axios from 'axios';

import DateOfBirthSelect from './DateOfBirthSelect';
import GenderSelect from './GenderSelect';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import InputField from '../elements/input-field/registerInput';
import { useNavigate } from 'react-router';
import { ShowRegisterFormProps } from './LoginForm';
import { RegisterProps } from '../../types/user';

const fullYear = new Date().getFullYear();

const RegisterForm: React.FC<ShowRegisterFormProps> = ({ setIsRegister }) => {
  const initialValues: RegisterProps = {
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    bYear: fullYear,
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDate(),
    gender: '',
  };

  const dispatch = useDispatch();

  const [userInput, setUserInput] = useState<RegisterProps>(initialValues);
  const [dateError, setDateError] = useState<string>('');
  const [genderError, setGenderError] = useState<string>('');

  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const {
    email,
    password,
    first_name,
    last_name,
    bYear,
    bMonth,
    bDay,
    gender,
  } = userInput;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const UserInputValidation = Yup.object({
    first_name: Yup.string()
      .required('What is your first name')
      .min(5, 'First name must be between 2 and 16 characters.')
      .max(16, 'First name must be between 2 and 16 characters.')
      .matches(/^[aA-zZ]+$/, 'Numbers and special characters are not allowed.'),
    last_name: Yup.string()
      .required('What is your last name')
      .min(5, 'Last name must be between 2 and 16 characters.')
      .max(16, 'Last name must be between 2 and 16 characters.')
      .matches(/^[aA-zZ]+$/, 'Numbers and special characters are not allowed.'),
    email: Yup.string()
      .required(
        "You'll need this when you log in and if you ever need to reset your password."
      )
      .email('Enter a valid email address.'),
    password: Yup.string()
      .required(
        'Enter a combination of at least six numbers, letters and punctuation marks(such as ! and &)'
      )
      .min(6, 'Password must be at least 6 characters.')
      .max(36, "Password can't be more than 36 characters."),
  });

  const years = Array.from(new Array(109), (val, index) => fullYear - index);
  const months = Array.from(new Array(12), (val, index) => 1 + index);
  const getDays = () => new Date(bYear, bMonth, 0).getDate();
  const days = Array.from(new Array(getDays()), (val, index) => 1 + index);

  const navigate = useNavigate();

  const handleSubmit = async (values: RegisterProps) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/register`,
        values
      );

      setLoading(false);
      setError('');
      setSuccess(data.message);
      const { message, ...rest } = data;
      setTimeout(() => {
        dispatch({ type: 'LOGIN', payload: { user: rest } });
        Cookies.set('user', JSON.stringify(rest));
        navigate('/');
      }, 2000);
    } catch (error: any) {
      setLoading(false);
      setSuccess('');
      setError(error.response.data.message);
    }
  };

  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i className="exit_icon" onClick={() => setIsRegister(false)} />
          <span>Sign Up</span>
          <span>It's quick and easy</span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            email,
            password,
            first_name,
            last_name,
            bYear,
            bMonth,
            bDay,
            gender,
          }}
          validationSchema={UserInputValidation}
          onSubmit={(values, actions) => {
            const current_date = new Date() as any;
            const picked_date = new Date(bYear, bMonth - 1, bDay) as any;
            const atLeast14YearsOld = new Date(1970 + 14, 0, 1) as any;
            const notMoreThan70YearsOld = new Date(1970 + 70, 0, 1) as any;

            if (current_date - picked_date < atLeast14YearsOld) {
              setDateError(
                'It looks like you have entered the wrong info. Please make sure that you use your real date of birth.'
              );
              return;
            } else if (current_date - picked_date > notMoreThan70YearsOld) {
              setDateError(
                'It looks like you have entered the wrong info. Please make sure that you use your real date of birth.'
              );
              return;
            } else if (gender === '') {
              setDateError('');
              setGenderError(
                'Please choose a gender. You can change who can see this later.'
              );
              return;
            } else {
              setDateError('');
              setGenderError('');
              // actions.setSubmitting(false);
              handleSubmit(values);
            }
          }}
        >
          {(props: FormikProps<RegisterProps>) => (
            <Form className="register_form">
              <div className="register_line">
                <InputField
                  placeholder="First Name"
                  name="first_name"
                  type="text"
                  onChange={handleInputChange}
                  bottom
                />
                <InputField
                  placeholder="Last Name"
                  name="last_name"
                  type="text"
                  onChange={handleInputChange}
                  bottom
                />
              </div>
              <div className="register_line">
                <InputField
                  placeholder="Email address or phone number"
                  name="email"
                  type="text"
                  onChange={handleInputChange}
                  bottom
                />
              </div>
              <div className="register_line">
                <InputField
                  name="password"
                  placeholder="Password"
                  type="password"
                  onChange={handleInputChange}
                  bottom
                />
              </div>
              <div className="register_col">
                <div className="reg_line_header">
                  Date of birth <i className="info_icon" />
                </div>
                <DateOfBirthSelect
                  days={days}
                  months={months}
                  years={years}
                  dateError={dateError}
                  handleSelectChange={handleSelectChange}
                  bDay={bDay}
                  bMonth={bMonth}
                  bYear={bYear}
                />
              </div>

              <div className="register_col">
                <div className="reg_line_header">
                  Gender <i className="info_icon" />
                </div>
                <GenderSelect
                  genderError={genderError}
                  handleInputChange={handleInputChange}
                />
              </div>
              <div className="register_info">
                By clicking Sign Up, you agree to our{' '}
                <span>Terms, Data Policy &nbsp;</span>
                and <span>Cookie Policy.</span> You may receive SMS
                notifications from us and can opt out at any time.
              </div>
              <div className="register_button_wrapper">
                <button type="submit" className="open_signup btn btn_green">
                  Sign Up
                </button>
              </div>

              {error && <div className="error_text">{error}</div>}
              {success && <div className="success_text">{success}</div>}
              <DotLoader color="#1876f2" loading={loading} size={30} />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterForm;
