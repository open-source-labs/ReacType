import { describe, it, expect } from 'vitest';
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
  it('should render a login input', () => {
    render(<TestSignIn />);
    expect(screen.getByTestId('username-input')).toBeDefined();
  });
  it('should render a password field', () => {
    render(<TestSignIn />);
    expect(screen.getByTestId('password-input')).toBeDefined();
  });
  it('should render 4 login buttons', () => {
    render(<TestSignIn />);
    expect(screen.getAllByRole('button')).toHaveLength(1);
  });
  it('should invalidate empty username field', () => {
    render(<TestSignIn />);
    fireEvent.click(screen.getByRole('button'));
    waitFor(() => {
      expect(screen.getByText('No Username Input')).toBeDefined();
    });
  });
  it('should invalidate empty password field', () => {
    render(<TestSignIn />);
    fireEvent.change(screen.getByRole('textbox'), {
      target: {
        value: 'username'
      }
    });
    fireEvent.click(screen.getByRole('button'));
    waitFor(() => {
      expect(screen.getByText('No Password Input')).toBeDefined();
    });
  });
});
