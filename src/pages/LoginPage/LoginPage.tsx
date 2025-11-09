import './LoginPage.css';
import {
  loginUser,
  type LoginUserData,
} from '../../data-access/coffee-shop-api/coffee-shop-api.repository.ts';
import { type InitUserLoginData, type UserLoginData, UserLoginSchema } from './loginSchema.ts';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userStore } from '../../store/userStore.ts';
import { FormField } from '../../components/inputs/FormField/FormField.tsx';
import { InputType } from '../../components/inputs/FormField.ts';
import { Button, ButtonStyle, ButtonType } from '../../components/Button/Button.tsx';
import { Spinner } from '../../components/Spinner/Spinner.tsx';
import { ERROR_MESSAGES } from '../../constants/validation-messages.ts';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../router/routes.ts';
import { useEffect, useState } from 'react';

export function LoginPage() {
  const { user, setUser } = userStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(ROUTES.MENU.replace(':category', 'coffee'));
    }
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const initFormData: InitUserLoginData = {
    login: '',
    password: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginData>({
    resolver: zodResolver(UserLoginSchema),
    defaultValues: initFormData,
    mode: 'all',
  });

  const onSubmit: SubmitHandler<LoginUserData> = async (data) => {
    const userData = {
      login: data.login,
      password: data.password,
    };

    try {
      setIsLoading(true);

      const user = await loginUser(userData);

      if (user) {
        setUser(user);
      }

      setErrorMessage('');
      navigate(ROUTES.MENU);
    } catch {
      const message = ERROR_MESSAGES.INCORRECT_LOGIN_OR_PASSWORD;

      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  const isBtnDisabled = Object.keys(errors).length > 0;

  return (
    <div className="login-page">
      <h2>Sign In</h2>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <FormField id="login" label="Login" {...register('login')} errors={errors} />
        <FormField
          id="password"
          label="Password"
          {...register('password')}
          errors={errors}
          inputType={InputType.Password}
        />
        <Button style={ButtonStyle.Secondary} type={ButtonType.Submit} isDisabled={isBtnDisabled}>
          Sign In
        </Button>
        <div className="color-warning">{errorMessage && errorMessage}</div>
      </form>
      {isLoading && <Spinner />}
    </div>
  );
}
