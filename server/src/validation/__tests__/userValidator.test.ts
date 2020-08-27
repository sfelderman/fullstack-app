import { validateRegistration } from '../userValidator';
describe('userValidator', () => {
  const validInput = { username: 'test-name', email: 'test@email', password: 'test-password' };

  it('returns empty errors and isValid when passed valid input', () => {
    const res = validateRegistration(validInput);

    expect(res.errors).toEqual({});
    expect(res.isValid).toEqual(true);
  });

  it('returns an error when the body is empty', () => {
    const res = validateRegistration();

    expect(res.errors).toEqual({ body: expect.any(String) });
    expect(res.isValid).toEqual(false);
  });
  describe('Validate username', () => {
    it('returns an error when the username is empty', () => {
      const res = validateRegistration({ ...validInput, username: undefined });

      expect(res.errors).toEqual({ username: expect.any(String) });
      expect(res.isValid).toEqual(false);
    });
  });

  describe('Validate email', () => {
    it('returns an error when the email is empty', () => {
      const res = validateRegistration({ ...validInput, email: undefined });

      expect(res.errors).toEqual({ email: expect.any(String) });
      expect(res.isValid).toEqual(false);
    });

    it('returns an error when the email is invalid', () => {
      const res = validateRegistration({ ...validInput, email: 'adsfasdf' });

      expect(res.errors).toEqual({ email: expect.any(String) });
      expect(res.isValid).toEqual(false);
    });
  });

  describe('Validate password', () => {
    it('returns an error when the password is empty', () => {
      const res = validateRegistration({ ...validInput, password: undefined });

      expect(res.errors).toEqual({ password: expect.any(String) });
      expect(res.isValid).toEqual(false);
    });
  });
});
