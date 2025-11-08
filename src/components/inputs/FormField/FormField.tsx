import '../FormField.css';
import { type FormFieldProps, InputType } from '../FormField.ts';
import clsx from 'clsx';

export function FormField(props: FormFieldProps) {
  const {
    id,
    label,
    errors,
    name,
    ref,
    onChange,
    onBlur,
    className,
    inputType = InputType.Text,
  } = props;

  const errorMessage = errors?.[name]?.message;
  const formFieldClassNames = clsx('form-field-container', className, { error: errorMessage });

  return (
    <div className={formFieldClassNames}>
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <input
        className="input"
        type={inputType}
        id={id}
        name={name}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
      />
      <div className="helper-text">{errorMessage}</div>
    </div>
  );
}
