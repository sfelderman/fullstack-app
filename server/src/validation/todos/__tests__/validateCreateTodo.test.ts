import validateCreateTodo, { CreateTodoInput } from '../validateCreateTodo';

describe('validateCreateTodo', () => {
  const validInput = {
    text: 'Some Text',
    completed: false
  };

  it('returns empty errors and isValid when passed valid input', () => {
    const res = validateCreateTodo(validInput);

    expect(res.errors).toEqual({});
    expect(res.isValid).toEqual(true);
  });

  it('returns an error when the body is empty', () => {
    const res = validateCreateTodo();

    expect(res.errors).toEqual({ body: expect.any(String) });
    expect(res.isValid).toEqual(false);
  });

  it('should return an error when missing text field', () => {
    const badInput = ({ ...validInput, text: undefined } as unknown) as CreateTodoInput;

    const res = validateCreateTodo(badInput);

    expect(res.errors).toEqual({ text: expect.any(String) });
    expect(res.isValid).toEqual(false);
  });

  it('should return an error when missing completed field', () => {
    const badInput = ({ ...validInput, completed: undefined } as unknown) as CreateTodoInput;

    const res = validateCreateTodo(badInput);

    expect(res.errors).toEqual({ completed: expect.any(String) });
    expect(res.isValid).toEqual(false);
  });

  it('should return an error when completed is not a boolean', () => {
    const badInput = ({ ...validInput, completed: 'testing' } as unknown) as CreateTodoInput;

    const res = validateCreateTodo(badInput);

    expect(res.errors).toEqual({ completed: expect.any(String) });
    expect(res.isValid).toEqual(false);
  });
});
