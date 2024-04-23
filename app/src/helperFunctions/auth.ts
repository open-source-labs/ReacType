// const fetch = require('node-fetch');
const isDev = import.meta.env.NODE_ENV === 'development';
// const fetch = require('node-fetch');
// import fetch from 'node-fetch';
import serverConfig from '../serverConfig.js';
import axios from 'axios';
const { DEV_PORT, API_BASE_URL } = serverConfig;

import {
  IErrorSetters,
  AuthStateSetters,
  ValidationParams
} from '../interfaces/Interfaces';

let serverURL = API_BASE_URL;
if (isDev) {
  serverURL = `http://localhost:${DEV_PORT}`;
}

/**
 * Sends the user's credentials to the server to get and verify the user, create a session ID cookie, and start a session.
 * This function performs an HTTP POST request to the server's login endpoint, and can handle both standard and OAuth-based logins.
 * @param {string} username - The username submitted by the user in the form.
 * @param {string} password - The password submitted by the user in the form.
 * @param {boolean} isFbOauth - Indicates whether the login attempt is using Facebook OAuth for authentication.
 * @returns {Promise<string>} - Returns 'Success' if the login is successful and a session ID is created,
 *                              otherwise throws an error with a message indicating the failure reason.
 * @throws {Error} - Throws an error if the login is unsuccessful, detailing whether it was due to a missing session ID
 *                   in the response, a server error, or a network issue.
 */
export const sessionIsCreated = async (
  username: string,
  password: string,
  isFbOauth: boolean
): Promise<string> => {
  const body = JSON.stringify({
    username,
    password,
    isFbOauth
  });
  try {
    const response = await axios.post(`${serverURL}/login`, body, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const { data } = response;
    if (data.sessionId && typeof data.sessionId === 'string') {
      window.localStorage.setItem('ssid', data.sessionId);
      window.localStorage.setItem('username', username);
      return 'Success';
    } else {
      console.error('Session ID missing from response');
      throw new Error('Login failed: Session ID missing');
    }
  } catch (err) {
    console.error('Error starting session:', err);
    throw new Error('Login failed: ' + err);
  }
};

/**
 * Sends the user's credentials to the server to create a user, create a session ID cookie, and start a session.
 * This function performs an HTTP POST request to the server's signup endpoint.
 * @param {string} email - The email submitted by the user in the form.
 * @param {string} username - The username submitted by the user in the form.
 * @param {string} password - The password submitted by the user in the form.
 * @returns {Promise<string>} - Returns 'Success' if the signup is successful and a session ID is created,
 *                              otherwise throws an error with a message indicating the failure reason.
 * @throws {Error} - Throws an error if the signup is unsuccessful, detailing whether it was due to a missing session ID
 *                   in the response, a server error, or a network issue.
 */
export const newUserIsCreated = async (
  username: string,
  email: string,
  password: string
): Promise<string> => {
  const body = JSON.stringify({
    username,
    email,
    password
  });
  try {
    const response = await axios.post(`${serverURL}/signup`, body, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const { data } = response;
    if (data.sessionId && typeof data.sessionId === 'string') {
      window.localStorage.setItem('ssid', data.sessionId);
      window.localStorage.setItem('username', username);
      window.localStorage.setItem('email', email);
      return 'Success';
    } else if (
      data.message === 'Email Taken' ||
      data.message === 'Username Taken'
    ) {
      throw new Error(data.message);
    }
    throw new Error('Unexpected error during sign up.');
  } catch (err) {
    console.error('Error during sign up:', err);
    throw new Error('Signup failed: ' + err);
  }
};

/**
 * Sends the user's username and new password to the server to update the user's password.
 * This function performs an HTTP PATCH request to the server's update password endpoint.
 * @param {string} username - The username submitted by the user in the form.
 * @param {string} password - The password submitted by the user in the form.
 * @returns {Promise<string>} - Returns a message indicating the success or nature of the failure.
 * @throws {Error} Throws an error if the fetch operation fails or the server responds with an error.
 */
export const updatePassword = async (
  username: string,
  password: string
): Promise<string> => {
  if (!username || !password) {
    throw new Error('Missing username or password.'); // Initial input validation
  }
  try {
    const response = await axios.patch(
      `${serverURL}/updatePassword`,
      {
        username: username,
        password: password
      },
      {
        withCredentials: true, // Necessary for including cookies if using sessions
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('Profile updated successfully:', response.data);
    return response.data.message; // Returning response data directly
  } catch (err) {
    console.error('Error updating password:', err);
    throw new Error('Password update failed: ' + err);
  }
};

/**
 * Dynamically updates error states and messages for various form input fields based on the type of validation error encountered.
 * This function is crucial for providing immediate feedback on input fields within the UI, enhancing the user experience by
 * clearly indicating what needs to be corrected.
 *
 * @param {string} type - The type of form input field that has encountered an error. Valid types include:
 *                        'email', 'username', 'password', and 'verifyPassword'.
 * @param {string} message - The descriptive error message that will be displayed next to the erroneous input field.
 * @param {IErrorSetters} setters - An object containing functions that update the error state and messages for the form inputs.
 *                                  Each function is tailored to a specific type of input and includes:
 *                                  - `setInvalidEmail` and `setInvalidEmailMsg`
 *                                  - `setInvalidUser` and `setInvalidUserMsg`
 *                                  - `setInvalidPassword` and `setInvalidPasswordMsg`
 *                                  - `setInvalidVerifyPassword` and `setInvalidVerifyPasswordMsg`
 */
export const setErrorMessages = (
  type: string,
  message: string,
  setters: IErrorSetters
) => {
  const {
    setInvalidEmail,
    setInvalidEmailMsg,
    setInvalidUser,
    setInvalidUserMsg,
    setInvalidPassword,
    setInvalidPasswordMsg,
    setInvalidVerifyPassword,
    setInvalidVerifyPasswordMsg
  } = setters;

  switch (type) {
    case 'email':
      if (setInvalidEmail) setInvalidEmail(true);
      if (setInvalidEmailMsg) setInvalidEmailMsg(message);
      break;
    case 'username':
      if (setInvalidUser) setInvalidUser(true);
      if (setInvalidUserMsg) setInvalidUserMsg(message);
      break;
    case 'password':
      if (setInvalidPassword) setInvalidPassword(true);
      if (setInvalidPasswordMsg) setInvalidPasswordMsg(message);
      break;
    case 'verifyPassword':
      if (setInvalidVerifyPassword) setInvalidVerifyPassword(true);
      if (setInvalidVerifyPasswordMsg) setInvalidVerifyPasswordMsg(message);
      break;
    default:
      console.log(`Unknown error type ${type}`);
  }
};

/**
 * Updates input value states for various input fields based on the user's interactions.
 * This function dynamically sets the state for the relevant input fields as the user types,
 * ensuring that the values are current when the form is submitted. It supports dynamic type handling
 * based on the `name` attribute of the input fields.
 * @param {React.ChangeEvent<HTMLInputElement>} event - The event object that triggered the change,
 *        containing the `name` and `value` of the input element.
 * @param {AuthStateSetters} setters -  An object containing setter functions for updating the state related to input values.
 *        Each setter function in the object should match the expected type of input. Supported inputs are
 *        'email', 'username', 'password', and 'passwordVerify'.
 */
export const handleChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setters: AuthStateSetters
) => {
  const { setEmail, setUsername, setPassword, setPasswordVerify } = setters;
  const { name, value } = event.target;
  switch (name) {
    case 'email':
      if (setEmail) setEmail(value);
      break;
    case 'username':
      if (setUsername) setUsername(value);
      break;
    case 'password':
      if (setPassword) setPassword(value);
      break;
    case 'passwordVerify':
      if (setPasswordVerify) setPasswordVerify(value);
      break;
  }
};

/**
 * Resets all validation error messages and states for form inputs.
 * This function clears any text messages and resets boolean flags associated with input validation errors.
 * @param {IErrorSetters} setters - An object containing setter functions for updating both the error messages and
 *        the boolean states related to input validation errors. Each setter function is expected to handle a specific
 *        type of input error. Supported setter functions include:
 *        - `setInvalidEmail` and `setInvalidEmailMsg`
 *        - `setInvalidUsername` and `setInvalidUsernameMsg`
 *        - `setInvalidPassword` and `setInvalidPasswordMsg`
 *        - `setInvalidVerifyPassword` and `setInvalidVerifyPasswordMsg`
 */
export const resetErrorValidation = (setters: IErrorSetters) => {
  const {
    setInvalidEmail,
    setInvalidEmailMsg,
    setInvalidUser,
    setInvalidUserMsg,
    setInvalidPassword,
    setInvalidPasswordMsg,
    setInvalidVerifyPassword,
    setInvalidVerifyPasswordMsg
  } = setters;

  if (setInvalidEmailMsg) setInvalidEmailMsg('');
  if (setInvalidUserMsg) setInvalidUserMsg('');
  if (setInvalidPasswordMsg) setInvalidPasswordMsg('');
  if (setInvalidVerifyPasswordMsg) setInvalidVerifyPasswordMsg('');
  if (setInvalidEmail) setInvalidEmail(false);
  if (setInvalidUser) setInvalidUser(false);
  if (setInvalidPassword) setInvalidPassword(false);
  if (setInvalidVerifyPassword) setInvalidVerifyPassword(false);
};

/**
 * Validates the inputs for various input fields by checking each specified input against validation rules.
 * If any input is invalid, sets appropriate error messages using the error setters provided.
 * @param {ValidationParams} param0 - An object containing the form's input values, which can include 'email', 'username', 'password', and 'passwordVerify'.
 *        If any of the inputs are ommited they are defaulted to an empty string.
 * @returns {boolean} - Returns a boolean 'true' if the inputs are valid, 'false' otherwise.
 */
export const validateInputs = ({
  email = '',
  username = '',
  password = '',
  passwordVerify,
  errorSetters
}: ValidationParams) => {
  let isValid = true; // Assume all inputs are valid initially

  // Email validation (for contexts where email is needed)
  if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    setErrorMessages('email', 'Invalid Email Format', errorSetters);
    isValid = false;
  }

  // Username validation
  if (!username) {
    setErrorMessages('username', 'Username is required', errorSetters);
    isValid = false;
  } else if (!/^[\w\s-]{4,15}$/i.test(username)) {
    setErrorMessages(
      'username',
      'Must Be 4 - 15 Characters Long',
      errorSetters
    );
    isValid = false;
  } else if (!/^[\w-]+$/i.test(username)) {
    setErrorMessages(
      'username',
      'Cannot Contain Spaces or Special Characters',
      errorSetters
    );
    isValid = false;
  }

  // Password validation
  if (!password) {
    setErrorMessages('password', 'Password is required', errorSetters);
    isValid = false;
  } else if (password.length < 8) {
    setErrorMessages('password', 'Minimum 8 Characters', errorSetters);
    isValid = false;
  } else if (
    !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i.test(
      password
    )
  ) {
    setErrorMessages(
      'password',
      'Minimum 1 Letter, Number, and Special Character',
      errorSetters
    );
    isValid = false;
  }

  // Password verification (for contexts where a password confirmation is needed)
  if (passwordVerify !== undefined) {
    if (passwordVerify !== password) {
      setErrorMessages(
        'verifyPassword',
        'Passwords Do Not Match',
        errorSetters
      );
      isValid = false;
    } else if (!passwordVerify) {
      setErrorMessages(
        'verifyPassword',
        'Password Verification Required',
        errorSetters
      );
      isValid = false;
    }
  }

  return isValid;
};
