/**
 * Generates a random password.
 * @returns {string} - A randomly generated password string.
 */
const randomPassword = () => {
  /**
   * Generates a random special character.
   * @returns {string} - A random special character.
   */
  function getRandomSpecialChar() {
    const code = Math.round(Math.random() * (38 - 37) + 37);
    return String.fromCharCode(code);
  }
  /**
   * Generates a random digit.
   * @returns {string} - A random digit.
   */
  function getRandomDigit() {
    const code = Math.round(Math.random() * (57 - 48) + 48);
    return String.fromCharCode(code);
  }
  /**
   * Generates a random letter.
   * @returns {string} - A random letter.
   */
  function getRandomLetter() {
    const code = Math.round(Math.random() * (90 - 65) + 65);
    return String.fromCharCode(code);
  }
  let password = '';

  for (let i = 0; i < 6; i += 1) {
    password += getRandomLetter() + getRandomDigit() + getRandomSpecialChar();
  }
  return password;
};
export default randomPassword;
