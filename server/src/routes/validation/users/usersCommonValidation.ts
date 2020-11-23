import { isEmptyStr } from '../commonValidation';

export const checkEmail = (email: string, errors: { email?: string }): void => {
  if (isEmptyStr(email)) errors.email = "Can't be empty";
  if (!/\S+@\S+/.test(email)) errors.email = 'Must be a valid email address';
};

export const checkPassword = (password: string, errors: { password?: string }): void => {
  if (isEmptyStr(password)) errors.password = "Can't be empty";
};
