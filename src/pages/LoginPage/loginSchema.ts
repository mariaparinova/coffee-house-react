import { z } from 'zod';
import { ERROR_MESSAGES } from '../../constants/validation-messages.ts';

export const UserLoginSchema = z.object({
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
});

export type UserLoginData = z.infer<typeof UserLoginSchema>;
export type InitUserLoginData = UserLoginData;
