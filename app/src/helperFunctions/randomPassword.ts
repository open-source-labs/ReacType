const randomPassword = () => {
  function getRandomSpecialChar() {
    const code = Math.round(Math.random() * (38 - 37) + 37);
    return String.fromCharCode(code);
  }
  function getRandomDigit() {
    const code = Math.round(Math.random() * (57 - 48) + 48);
    return String.fromCharCode(code);
  }
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
