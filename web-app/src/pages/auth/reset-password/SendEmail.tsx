import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  image: string;
  first_name: string;
  last_name: string;
  email: string;
};

const SendEmail: React.FC<Props> = ({
  email,
  first_name,
  last_name,
  image,
}) => {
  return (
    <div className="reset_form dynamic_height">
      <div className="reset_form_header">Reset Your Password</div>
      <div className="reset_grid">
        <div className="reset_left">
          <div className="reset_form_text">
            How do you want to receive the code to reset your password?
          </div>
          <label htmlFor="email" className="hover1">
            <input type="radio" name="email" id="email" checked readOnly />
            <div className="label_col">
              <span>Send code via email</span>
              <span>{email}</span>
            </div>
          </label>
        </div>
        <div className="reset_right">
          <img src={image} alt={first_name} />
          <span>{email}</span>
          <span>Facebook user</span>
        </div>
      </div>
      <div className="reset_form_footer">
        <Link to="/auth/login" className="btn btn_gray">
          Not you?
        </Link>
        <button className="btn btn_blue" type="submit">
          Continue
        </button>
      </div>
    </div>
  );
};

export default SendEmail;
