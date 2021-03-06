import validateUpdateTodo, { UpdateTodoInput } from '../validateUpdateTodo';

describe('validateUpdateTodo', () => {
  const validInput = {};

  it('should return valid when passed valid params', () => {
    const res = validateUpdateTodo(validInput);

    expect(res.errors).toEqual({});
    expect(res.isValid).toEqual(true);
  });

  it('should not return an error when empty', () => {
    const res = validateUpdateTodo({});

    expect(res.errors).toEqual({});
    expect(res.isValid).toEqual(true);
  });

  it('should return error when completed is not a boolean', () => {
    const badInput = ({ ...validInput, completed: 'adsf' } as unknown) as UpdateTodoInput;
    const res = validateUpdateTodo(badInput);

    expect(res.errors).toEqual({ completed: expect.any(String) });
    expect(res.isValid).toEqual(false);
  });
});
