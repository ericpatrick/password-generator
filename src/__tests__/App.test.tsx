import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import { generatePawword } from '../utlis/GeneratePassword';

vi.mock('js-generate-password');

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the initial UI as expected', () => {
    // Given
    render(<App />);

    // Then
    expect(screen.getByRole('heading', { name: /password generator/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue('');
    expect(screen.getByRole('button', { name: /generate/i })).toBeInTheDocument();
  });

  it('should generate a password when the generate button is clicked', () => {
    // Given
    const {mockPassword} = vi.hoisted(() => ({
      mockPassword: 'mockPassword123'
    }))
    vi.mock('../utlis/GeneratePassword', () => ({
      generatePawword: vi.fn().mockReturnValue(mockPassword)
    }))

    render(<App />);

    // When
    fireEvent.click(screen.getByRole('button', { name: /generate/i }));

    // Then
    expect(screen.getByRole('textbox')).toHaveValue(mockPassword);
    expect(generatePawword).toHaveBeenCalledWith({
      length: 10,
      lowercase: true,
      uppercase: false,
      numbers: false,
      symbols: false,
    });
  });

  it('should update settings when checkbox values are changed', () => {
    // Given
    render(<App />);

    // When
    const uppercaseCheckbox = screen.getByLabelText(/include uppercase/i);
    fireEvent.click(uppercaseCheckbox);

    // Then
    expect(uppercaseCheckbox).toBeChecked();
  });
});
