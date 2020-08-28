import { ObjectT } from '../types/common';
import { isEmptyObj, isEmptyStr, checkEmail, checkPassword } from './commonValidation';

type RegistrationInput = {
  username?: string;
  password?: string;
  email?: string;
};

type RegistrationErrors = {
  body?: string;
  username?: string;
  password?: string;
  email?: string;
};

type RegistrationResponse = {
  errors: RegistrationErrors;
  isValid: boolean;
};

const isRegistrationInput = (input?: RegistrationInput): input is RegistrationInput => {
  return !isEmptyObj(input);
};

const validateRegistration = (reqBody?: RegistrationInput): RegistrationResponse => {
  const errors: ObjectT = {};

  if (!isRegistrationInput(reqBody)) {
    errors.body = "Can't be empty";
    return { errors, isValid: false };
  }

  const { username = '', email = '', password = '' } = reqBody;

  checkUsername(username, errors);
  checkEmail(email, errors);
  checkPassword(password, errors);

  return {
    errors,
    isValid: isEmptyObj(errors)
  };
};

// TODO username already taken
const checkUsername = (username: string, errors: RegistrationErrors): void => {
  if (isEmptyStr(username)) errors.username = "Can't be empty";
};

export default validateRegistration;
