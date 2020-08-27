import { ObjectT } from '../types/common';

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

const isEmptyObj = (inputObj?: ObjectT) => {
  return !inputObj || Object.keys(inputObj).length == 0;
};

const isEmptyStr = (inputStr?: string) => {
  return !inputStr || inputStr.length == 0;
};

const isRegistrationInput = (input?: RegistrationInput): input is RegistrationInput => {
  return !isEmptyObj(input);
};

export const validateRegistration = (reqBody?: RegistrationInput): RegistrationResponse => {
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

const checkEmail = (email: string, errors: RegistrationErrors): void => {
  if (isEmptyStr(email)) errors.email = "Can't be empty";
  if (!/\S+@\S+/.test(email)) errors.email = 'Must be a valid email address';
};

const checkPassword = (password: string, errors: RegistrationErrors): void => {
  if (isEmptyStr(password)) errors.password = "Can't be empty";
};
