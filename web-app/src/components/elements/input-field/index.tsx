import { ErrorMessage, useField } from 'formik';
import React, { ChangeEvent } from 'react';
import { useMediaQuery } from 'react-responsive';
import './style.css';

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

  const desktopView = useMediaQuery({
    query: '(min-width: 850px)',
  });

  const inputError = desktopView
    ? 'input_error desktop_input_error'
    : 'input_error';

  return (
    <div className="input_wrapper">
      {hasError && !bottom && (
        <div className={inputError} style={{ transform: 'translateY: (3px)' }}>
          <ErrorMessage name={field.name} />
          <div
            className={desktopView ? 'error_arrow_left' : 'error_arrow_top'}
          />
        </div>
      )}
      <input
        className={hasError ? 'input_error_border' : ''}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {hasError && bottom && (
        <div className={inputError} style={{ transform: 'translateY: (1px)' }}>
          <ErrorMessage name={field.name} />
          <div
            className={desktopView ? 'error_arrow_left' : 'error_arrow_bottom'}
          />
        </div>
      )}

      {hasError && (
        <i
          className="error_icon"
          style={{
            top: `${!bottom && !desktopView && '63%'}`,
          }}
        />
      )}
    </div>
  );
};
export default InputField;
