import { isEmptyObj } from '../commonValidation';
import { isBoolean } from 'util';

export type UpdateTodoInput = {
  isCompleted?: boolean;
};

type UpdateTodoErrors = {
  isCompleted?: string;
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

  if (input && !isBoolean(input.isCompleted)) {
    errors.isCompleted = 'Must be a boolean';
  }

  return {
    errors,
    isValid: isEmptyObj(errors)
  };
};

export default validateUpdateTodo;
