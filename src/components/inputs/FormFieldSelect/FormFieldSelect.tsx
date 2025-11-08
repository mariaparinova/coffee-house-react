import '../FormField.css';
import type { ChangeEventHandler, FocusEventHandler, Ref } from 'react';
import clsx from 'clsx';

export function FormFieldSelect(props: FormFieldSelectProps) {
  const { id, label, values, errors, defaultValue, onBlur, ref, name, onChange, className } = props;
  const errorMessage = errors?.[name]?.message;
  const formFieldClassNames = clsx('form-field-container', className, { error: errorMessage });

  return (
    <div className={formFieldClassNames}>
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <select
        className="select"
        id={id}
        defaultValue={defaultValue || ''}
        name={name}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
      >
        <option key={'default-option'} value={''} />
        {values.map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </select>
      <div className="helper-text">{errors[name]?.message}</div>
    </div>
  );
}

export interface FormFieldSelectProps {
  id: string;
  label: string;
  values: string[];
  errors: Record<string, { message?: string }>;
  name: string;
  onChange?: ChangeEventHandler;
  ref?: Ref<HTMLSelectElement>;
  onBlur?: FocusEventHandler<HTMLSelectElement>;
  defaultValue?: string;
  className?: string;
}
