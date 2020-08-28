import { isEmptyObj, checkEmail, checkPassword } from './commonValidation';
import { ObjectT } from '../types/common';

type LoginInput = {
  email?: string;
  password?: string;
};

type LoginErrors = {
  body?: string;
  password?: string;
  email?: string;
};

type LoginResponse = {
  isValid: boolean;
  errors: LoginErrors;
};

const isLoginInput = (input?: LoginInput): input is LoginInput => {
  return !isEmptyObj(input);
};

const validateLoginInput = (input?: LoginInput): LoginResponse => {
  const errors: ObjectT = {};

  if (!isLoginInput(input)) {
    errors.body = "Can't be empty";
    return { errors, isValid: false };
  }

  const { email = '', password = '' } = input;

  checkEmail(email, errors);
  checkPassword(password, errors);

  return {
    errors,
    isValid: isEmptyObj(errors)
  };
};

export default validateLoginInput;
