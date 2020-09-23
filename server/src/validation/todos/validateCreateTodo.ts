import { isEmptyObj, isEmptyStr, isBoolean } from '../commonValidation';

export type CreateTodoInput = {
  text: string;
  completed: boolean;
};

type CreateTodoErrors = {
  body?: string;
  text?: string;
  completed?: string;
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

  const { text, completed } = input;

  if (isEmptyStr(text)) {
    errors.text = "Can't be empty";
  }

  if (completed === undefined) {
    errors.completed = "Can't be empty";
  } else if (!isBoolean(completed)) {
    errors.completed = 'Must be boolean';
  }

  return { errors, isValid: isEmptyObj(errors) };
};

export default validateCreateTodo;
