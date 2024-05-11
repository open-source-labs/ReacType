import { describe, it, expect } from 'vitest';
import randomPassword from '../app/src/helperFunctions/randomPassword';

describe('Random Password', () => {
  it('should generate password with 18 characters', () => {
    expect(randomPassword()).toHaveLength(18);
  });
});
