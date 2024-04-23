import randomPassword from '../app/src/helperFunctions/randomPassword';

describe('Random Password', () => {
  test('should generate password with 18 characters', () => {
    expect(randomPassword()).toHaveLength(18);
  });
});
