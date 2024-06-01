import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import LoginInput from '../../components/LoginInput';
import { renderWithProviders } from '../../utils/test-utils';

describe('Login Input Component', () => {
  it('should handle username typing correctly', async () => {
    /// Arrange
    renderWithProviders(
      <BrowserRouter>
        <LoginInput onSubmit={(values) => values} />
      </BrowserRouter>,
    );
    const emailInput = await screen.findByPlaceholderText('your@email.com');

    /// Act
    await userEvent.type(emailInput, 'lotaf@mail.com');

    /// Assert
    expect(emailInput).toHaveValue('lotaf@mail.com'); // should be empty
  });

  it('should handle password typing correctly', async () => {
    /// Arrange
    renderWithProviders(
      <BrowserRouter>
        <LoginInput onSubmit={(values) => values} />
      </BrowserRouter>,
    );
    const passwordInput = await screen.findByPlaceholderText('******');

    /// Act
    await userEvent.type(passwordInput, '123456');

    /// Assert
    expect(passwordInput).toHaveValue('123456'); // should be empty
  });

  it('should handle login button click correctly', async () => {
    /// Arrange
    const mockLogin = jest.fn();
    renderWithProviders(
      <BrowserRouter>
        <LoginInput onSubmit={mockLogin} />
      </BrowserRouter>,
    );
    const emailInput = await screen.findByPlaceholderText('your@email.com');
    await userEvent.type(emailInput, 'lotaf@mail.com');
    const passwordInput = await screen.findByPlaceholderText('******');
    await userEvent.type(passwordInput, '123456');
    const loginButton = await screen.findByRole('button', { name: 'Login' });

    /// Act
    await userEvent.click(loginButton);

    /// Assert
    expect(mockLogin).toBeCalledWith({ email: 'lotaf@mail.com', password: '123456' });
  });
});
