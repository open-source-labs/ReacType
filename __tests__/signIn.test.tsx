import SignIn from '../app/src/components/login/SignIn';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../app/src/redux/store';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

function TestSignIn() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    </Provider>
  );
}

describe('sign in page', () => {
  test('should render a login input', () => {
    render(<TestSignIn />);
    expect(screen.getByTestId('username-input')).toBeInTheDocument();
  });
  test('should render a password field', () => {
    render(<TestSignIn />);
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
  });
  test('should render 4 login buttons and dark mode button', () => {
    render(<TestSignIn />);
    expect(screen.getAllByRole('button')).toHaveLength(5);
  });
  test('should invalidate empty username field', () => {
    render(<TestSignIn />);
    fireEvent.click(screen.getAllByRole('button')[1]);
    waitFor(() => {
      expect(screen.getByText('No Username Input')).toBeInTheDocument();
    });
  });
  test('should invalidate empty password field', () => {
    render(<TestSignIn />);
    console.log(screen.getAllByRole('textbox'));
    fireEvent.change(screen.getByRole('textbox'), {
      target: {
        value: 'username'
      }
    });
    fireEvent.click(screen.getAllByRole('button')[1]);
    waitFor(() => {
      expect(screen.getByText('No Password Input')).toBeInTheDocument();
    });
  });
});
