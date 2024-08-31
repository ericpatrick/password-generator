import { render, screen, fireEvent } from '@testing-library/react';
import { InputTextWithIcon } from '../InputTextWithIcon';

describe('InputTextWithIcon', () => {

  it('should display the input with the provided value', () => {
    // Given
    const inputValue = 'test password';

    // When
    render(<InputTextWithIcon inputValue={inputValue} />);

    // Then
    const inputElement = screen.getByDisplayValue(inputValue);
    expect(inputElement).toBeInTheDocument();
  });

  it('should copy the input value to clipboard when the button is clicked', async () => {
    // Given
    const inputValue = 'test password';
    render(<InputTextWithIcon inputValue={inputValue} />);
    const buttonElement = screen.getByRole('button');

    // Mock clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });

    // When
    fireEvent.click(buttonElement);

    // Then
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(inputValue);
  });

  it('should show an alert with "Password copied!" when the button is clicked', () => {
    // Given
    const inputValue = 'test password';
    render(<InputTextWithIcon inputValue={inputValue} />);
    const buttonElement = screen.getByRole('button');

    // Mock alert
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    // When
    fireEvent.click(buttonElement);

    // Then
    expect(alertSpy).toHaveBeenCalledWith('Password copied!');
  });
});
