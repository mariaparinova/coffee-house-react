import { z } from 'zod';
import { ERROR_MESSAGES } from '../../constants/validation-messages.ts';

export const UserRegistrationSchema = z
  .object({
    login: z
      .string()
      .min(3, { message: ERROR_MESSAGES.MUST_BE_AT_LEAST_3_CHARACTERS_LONG })
      .regex(/^[A-Za-z].*$/, { message: ERROR_MESSAGES.MAST_START_WITH_LETTER })
      .regex(/^[A-Za-z]+$/, {
        message: ERROR_MESSAGES.ONLY_ENGLISH_LETTER_ALLOWED,
      }),

    password: z
      .string()
      .min(6, { message: ERROR_MESSAGES.MUST_BE_AT_LEAST_6_CHARACTERS_LONG })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: ERROR_MESSAGES.MUST_CONTAIN_CHARACTER,
      }),

    confirmPassword: z.string().min(6, { message: ERROR_MESSAGES.CONFIRM_PASSWORD_MUST_BE_SAME }),

    city: z.string().nonempty({ message: ERROR_MESSAGES.REQUIRED_FIELD }),

    street: z.string().nonempty({ message: ERROR_MESSAGES.REQUIRED_FIELD }),

    houseNumber: z.number().min(1, { message: ERROR_MESSAGES.VALUE_MUST_BE_GRATER_THAN_1 }),

    paymentMethod: z.string({ message: ERROR_MESSAGES.REQUIRED_FIELD }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: ERROR_MESSAGES.CONFIRM_PASSWORD_MUST_BE_SAME,
        path: ['confirmPassword'],
      });
    }
  });

export type UserRegistrationData = z.infer<typeof UserRegistrationSchema>;

export type InitUserRegistrationData = Pick<UserRegistrationData, 'city' | 'street'>;
