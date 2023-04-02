import { ErrorMessage, useField } from 'formik';
import React, { ChangeEvent } from 'react';
import { useMediaQuery } from 'react-responsive';
import './style.css';
import './registerInput.css';

interface InputFieldProps {
  placeholder?: string;
  type?: string;
  name: string;
  bottom?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  bottom,
  ...props
}) => {
  const [field, meta] = useField(props);
  const hasError = meta.touched && meta.error;

  const view1 = useMediaQuery({
    query: '(min-width: 539px)',
  });
  const view2 = useMediaQuery({
    query: '(min-width: 850px)',
  });
  const view3 = useMediaQuery({
    query: '(min-width: 1170px)',
  });

  const inputError = view3 ? 'input_error desktop_input_error' : 'input_error';

  const test1 = view3 && field.name === 'first_name';
  const test2 = view3 && field.name === 'last_name';

  return (
    <div className="input_wrapper register_input_wrap">
      {hasError && !bottom && (
        <div className={inputError} style={{ transform: 'translateY: (3px)' }}>
          <ErrorMessage name={field.name} />
          <div className={view3 ? 'error_arrow_left' : 'error_arrow_top'} />
        </div>
      )}
      <input
        className={hasError ? 'input_error_border' : ''}
        placeholder={placeholder}
        {...field}
        {...props}
        style={{
          width: `
          ${
            view1 && (field.name === 'first_name' || field.name === 'last_name')
              ? '100%'
              : view1 && (field.name === 'email' || field.name === 'password')
              ? '370px'
              : '300px'
          }`,
        }}
      />
      {hasError && bottom && (
        <div
          className={inputError}
          style={{
            transform: 'translateY: (2px)',
            left: `${test1 ? '-107%' : test2 ? '193px' : ''}`,
          }}
        >
          <ErrorMessage name={field.name} />
          <div
            className={
              view3 && field.name !== 'last_name'
                ? 'error_arrow_left'
                : view3 && field.name === 'last_name'
                ? 'error_arrow_right'
                : !view3
                ? 'error_arrow_bottom'
                : ''
            }
          />
        </div>
      )}

      {hasError && <i className="error_icon" />}
    </div>
  );
};
export default InputField;
