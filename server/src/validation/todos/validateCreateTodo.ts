import { isEmptyObj, isEmptyStr, isBoolean } from '../commonValidation';

export type CreateTodoInput = {
  text: string;
  isCompleted: boolean;
};

type CreateTodoErrors = {
  body?: string;
  text?: string;
  isCompleted?: string;
};

type CreateTodoResponse = {
  isValid: boolean;
  errors: CreateTodoErrors;
};

const isCreateTodoInput = (input?: CreateTodoInput): input is CreateTodoInput => {
  return !isEmptyObj(input);
};

const validateCreateTodo = (input?: CreateTodoInput): CreateTodoResponse => {
  const errors = {} as CreateTodoErrors;

  if (!isCreateTodoInput(input)) {
    errors.body = "Can't be empty";
    return { errors, isValid: false };
  }

  const { text, isCompleted } = input;

  if (isEmptyStr(text)) {
    errors.text = "Can't be empty";
  }

  if (isCompleted === undefined) {
    errors.isCompleted = "Can't be empty";
  }

  if (!isBoolean(isCompleted)) {
    errors.isCompleted = 'Must be boolean';
  }

  return { errors, isValid: isEmptyObj(errors) };
};

export default validateCreateTodo;
