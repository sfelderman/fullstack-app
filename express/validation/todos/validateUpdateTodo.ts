import { isEmptyObj, isBoolean } from '../commonValidation';

export type UpdateTodoInput = {
  completed?: boolean;
};

type UpdateTodoErrors = {
  completed?: string;
};

type UpdateTodoResponse = {
  isValid: boolean;
  errors: UpdateTodoErrors;
};

const validateUpdateTodo = (input?: UpdateTodoInput): UpdateTodoResponse => {
  const errors = {} as UpdateTodoErrors;

  if (isEmptyObj(input)) {
    return { errors: {}, isValid: true };
  }

  if (input && !isBoolean(input.completed)) {
    errors.completed = 'Must be a boolean';
  }

  return {
    errors,
    isValid: isEmptyObj(errors)
  };
};

export default validateUpdateTodo;
