import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import RegisterInput from '../../components/RegisterInput';
import { renderWithProviders } from '../../utils/test-utils';

describe('Register Input Component', () => {
  it('should handle name typing correctly', async () => {
    /// Arrange
    renderWithProviders(
      <BrowserRouter>
        <RegisterInput onSubmit={(values) => values} />
      </BrowserRouter>,
    );
    const nameInput = await screen.findByPlaceholderText('Your Name');

    /// Act
    await userEvent.type(nameInput, 'Muhammad Latief');

    /// Assert
    expect(nameInput).toHaveValue('Muhammad Latief'); // should be empty
  });

  it('should handle username typing correctly', async () => {
    /// Arrange
    renderWithProviders(
      <BrowserRouter>
        <RegisterInput onSubmit={(values) => values} />
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
        <RegisterInput onSubmit={(values) => values} />
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
    const mockRegister = jest.fn();
    renderWithProviders(
      <BrowserRouter>
        <RegisterInput onSubmit={mockRegister} />
      </BrowserRouter>,
    );

    const nameInput = await screen.findByPlaceholderText('Your Name');
    await userEvent.type(nameInput, 'Muhammad Latief');
    const emailInput = await screen.findByPlaceholderText('your@email.com');
    await userEvent.type(emailInput, 'lotaf@mail.com');
    const passwordInput = await screen.findByPlaceholderText('******');
    await userEvent.type(passwordInput, '123456');
    const registerButton = await screen.findByRole('button', { name: 'Register' });

    /// Act
    await userEvent.click(registerButton);

    /// Assert
    expect(mockRegister).toBeCalledWith({
      email: 'lotaf@mail.com',
      password: '123456',
      name: 'Muhammad Latief',
    });
  });
});
