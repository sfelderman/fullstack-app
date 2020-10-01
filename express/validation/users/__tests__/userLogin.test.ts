import validateLogin from '../userLogin';

describe('validateLogin', () => {
  const validInput = {
    email: 'test@123.com',
    password: 'abc123'
  };

  it('returns empty errors and isValid when passed valid input', () => {
    const res = validateLogin(validInput);

    expect(res.errors).toEqual({});
    expect(res.isValid).toEqual(true);
  });

  it('returns an error when the body is empty', () => {
    const res = validateLogin();

    expect(res.errors).toEqual({ body: expect.any(String) });
    expect(res.isValid).toEqual(false);
  });

  it('returns an error when email is empty', () => {
    const res = validateLogin({ ...validInput, email: '' });

    expect(res.errors).toEqual({ email: expect.any(String) });
    expect(res.isValid).toEqual(false);
  });

  it('returns an error when password is empty', () => {
    const res = validateLogin({ ...validInput, password: '' });

    expect(res.errors).toEqual({ password: expect.any(String) });
    expect(res.isValid).toEqual(false);
  });
});
