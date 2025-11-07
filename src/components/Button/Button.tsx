import './Button.css';
import type { MouseEventHandler, ReactNode } from 'react';
import clsx from 'clsx';

export function Button(props: ButtonProps) {
  const { style, children, type = ButtonType.Button, className, isDisabled, onClick } = props;

  return (
    <button
      type={type}
      className={clsx('button', style, className)}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

interface ButtonProps {
  children: ReactNode;
  style?: ButtonStyle;
  type?: ButtonType;
  className?: string;
  isDisabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export enum ButtonStyle {
  Primary = 'primary',
  Secondary = 'secondary',
  IconBtn = 'icon-btn',
  Round = 'round',
}

export enum ButtonType {
  Button = 'button',
  Submit = 'submit',
  Reset = 'reset',
}
