import '../FormField.css';
import type { ChangeEventHandler, FocusEventHandler, Ref } from 'react';
import clsx from 'clsx';

export function FormFieldRadio(props: FormFieldCRadioProps) {
  const { id, legend, errors, name, ref, onChange, onBlur, className, values } = props;
  const errorMessage = errors?.[name]?.message;
  const formFieldClassNames = clsx('form-field-container', 'radio', className, {
    error: errorMessage,
  });

  return (
    <div key={id} className={formFieldClassNames}>
      <legend className="legend">{legend}</legend>
      <div className="options-container">
        {values.map((value) => {
          const inputId: string = `${id}-${value}`;

          return (
            <div key={value} className="radio-option">
              <input
                type="radio"
                id={inputId}
                name={name}
                value={value}
                ref={ref}
                onChange={onChange}
                onBlur={onBlur}
                className="input radio"
              />
              <label className="label" htmlFor={inputId}>
                {value}
              </label>
            </div>
          );
        })}
      </div>
      <div className="helper-text">{errors[name]?.message}</div>
    </div>
  );
}

interface FormFieldCRadioProps {
  id: string;
  legend: string;
  errors: Record<string, { message?: string }>;
  name: string;
  values: string[];
  onChange?: ChangeEventHandler;
  ref?: Ref<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  className?: string;
}
