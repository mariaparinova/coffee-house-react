import './RegistrationPage.css';
import {
  registerUser,
  type RegistrationUserData,
} from '../../data-access/coffee-shop-api/coffee-shop-api.repository.ts';
import {
  type InitUserRegistrationData,
  type UserRegistrationData,
  UserRegistrationSchema,
} from './registrationSchema.ts';
import { type ChangeEvent, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userStore } from '../../store/userStore.ts';
import { FormField } from '../../components/inputs/FormField/FormField.tsx';
import { InputType } from '../../components/inputs/FormField.ts';
import { FormFieldSelect } from '../../components/inputs/FormFieldSelect/FormFieldSelect.tsx';
import { Button, ButtonStyle, ButtonType } from '../../components/Button/Button.tsx';
import { Spinner } from '../../components/Spinner/Spinner.tsx';
import { ERROR_MESSAGES } from '../../constants/validation-messages.ts';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../router/routes.ts';
import { FormFieldRadio } from '../../components/inputs/FormFieldRadio/FormFieldRadio.tsx';

const cities = ['warsaw', 'wroclaw', 'krakow'];
const streets = new Map();
streets.set('warsaw', [
  'krakowskie przedmiescie',
  'jerozolimskie',
  'nowy swiat',
  'swietokrzyska',
  'marszalkowska',
  'bednarska',
  'wawozowa',
  'rosola',
  'kosciuszki',
  'korkowa',
]);
streets.set('wroclaw', [
  'swidnicka',
  'wita stwosza',
  'jatki',
  'ruska',
  'katedralna',
  'bora-komorowskiego',
  '8 maja',
  '3 maja',
  'armii krajowej',
  'eugeniusza gepperta',
]);
streets.set('krakow', [
  'florianska',
  'grodzka',
  'szeroka',
  'kanonicza',
  'szewska',
  'gleboka',
  'krakowska',
  'wiezniow niemieckich',
  'wawel hill',
  'slawkowska',
]);

export function RegistrationPage() {
  const { user, setUser } = userStore();
  const navigate = useNavigate();

  if (user) {
    navigate(ROUTES.MENU);
  }

  const initCity = cities[0];
  const [currentStreets, setCurrentStreets] = useState(streets.get(initCity));
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const initFormData: InitUserRegistrationData = {
    city: initCity,
    street: streets.get(initCity).at(0),
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UserRegistrationData>({
    resolver: zodResolver(UserRegistrationSchema),
    defaultValues: initFormData,
    mode: 'all',
  });

  const onSubmit: SubmitHandler<RegistrationUserData> = async (data) => {
    const userData = {
      login: data.login,
      password: data.password,
      confirmPassword: data.confirmPassword,
      city: data.city,
      street: data.street,
      houseNumber: data.houseNumber,
      paymentMethod: data.paymentMethod,
    };

    try {
      setIsLoading(true);

      const user = await registerUser(userData);

      if (user) {
        setUser(user);
      }

      setErrorMessage('');
      navigate(ROUTES.MENU);
    } catch (e) {
      const message = e instanceof Error ? e.message : ERROR_MESSAGES.SMTH_WENT_WRONG_TRY_AGAIN;

      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  const isBtnDisabled = Object.keys(errors).length > 0;

  const handleChangeCity = (e: ChangeEvent<HTMLSelectElement>) => {
    const city = e.target.value;
    const updatedStreets = streets.get(city) ?? [];

    setCurrentStreets(updatedStreets);
    setValue('street', updatedStreets[0]);
  };

  return (
    <div className="registration-page">
      <h2>Registration</h2>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <FormField id="login" label="Login" {...register('login')} errors={errors} />
        <FormField
          id="password"
          label="Password"
          {...register('password')}
          errors={errors}
          inputType={InputType.Password}
        />
        <FormField
          id="confirmPassword"
          label="Confirm password"
          {...register('confirmPassword')}
          errors={errors}
          inputType={InputType.Password}
        />
        <FormFieldSelect
          id="city"
          label="City"
          values={cities}
          {...register('city')}
          errors={errors}
          onChange={handleChangeCity}
        />
        <FormFieldSelect
          id="street"
          label="Street"
          values={currentStreets}
          {...register('street')}
          errors={errors}
        />
        <div className="form-fields-group">
          <FormField
            id="houseNumber"
            label="House number"
            {...register('houseNumber', { valueAsNumber: true })}
            errors={errors}
            inputType={InputType.Number}
            className="house-number"
          />
          <FormFieldRadio
            id={'paymentMethod'}
            legend={'Payment method'}
            {...register('paymentMethod')}
            errors={errors}
            className="payment-method"
            values={['cash', 'card']}
          />
        </div>
        <Button style={ButtonStyle.Secondary} type={ButtonType.Submit} isDisabled={isBtnDisabled}>
          Submit
        </Button>
        <div className="color-warning">{errorMessage && errorMessage}</div>
      </form>
      {isLoading && <Spinner />}
    </div>
  );
}
