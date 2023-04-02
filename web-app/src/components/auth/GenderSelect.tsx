import React, { ChangeEvent } from 'react';
import { useMediaQuery } from 'react-responsive';

type Props = {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  genderError: string;
};

const GenderSelect: React.FC<Props> = ({ handleInputChange, genderError }) => {
  const view3 = useMediaQuery({
    query: '(min-width: 1170px)',
  });

  return (
    <div
      className="register_grid"
      style={{
        marginBottom: `${genderError && !view3 ? '90px' : '0'}`,
      }}
    >
      <label htmlFor="male">
        Male
        <input
          type="radio"
          name="gender"
          id="male"
          value="male"
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor="female">
        Female
        <input
          type="radio"
          name="gender"
          id="female"
          value="female"
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor="custom">
        Custom
        <input
          type="radio"
          name="gender"
          id="custom"
          value="custom"
          onChange={handleInputChange}
        />
      </label>
      {genderError && (
        <div
          className={
            !view3 ? 'input_error' : 'input_error input_error_select_large'
          }
        >
          <div
            className={!view3 ? 'error_arrow_bottom' : 'error_arrow_left'}
          ></div>
          {genderError}
        </div>
      )}
    </div>
  );
};

export default GenderSelect;
