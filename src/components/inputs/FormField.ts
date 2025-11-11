import type { ChangeEventHandler, FocusEventHandler, Ref } from 'react';

export enum InputType {
  Text = 'text',
  Password = 'password',
  Number = 'number',
}

export interface FormFieldProps {
  id: string;
  label: string;
  errors: Record<string, { message?: string }>;
  name: string;
  onChange?: ChangeEventHandler;
  ref?: Ref<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  inputType?: InputType;
  tabindex?: number;
  className?: string;
  defaultValue?: string;
}
