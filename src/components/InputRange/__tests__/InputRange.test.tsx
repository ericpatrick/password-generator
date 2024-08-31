import { render, screen, fireEvent } from '@testing-library/react';
import { InputRange } from '../InputRange';

describe('InputRange', () => {

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should render the label with the correct text', () => {
    // Given
    const label = 'Volume';
    const value = 50;

    // When
    render(<InputRange id="volume" label={label} value={value} onChange={() => {}} />);

    // Then
    const labelElement = screen.getByLabelText(`${label} ${value}`);
    expect(labelElement).toBeInTheDocument();
  });

  it('should render the input with the correct value', () => {
    // Given
    const value = 50;

    // When
    render(<InputRange id="volume" label="Volume" value={value} onChange={() => {}} />);

    // Then
    const inputElement = screen.getByRole('slider');
    expect(inputElement).toHaveValue(value.toString());
  });

  it('should call onChange when the input value changes', () => {
    // Given
    const handleChange = vi.fn();
    const value = 50;

    render(<InputRange id="volume" label="Volume" value={value} onChange={handleChange} />);

    // When
    const inputElement = screen.getByRole('slider');
    fireEvent.change(inputElement, { target: { value: '75' } });

    // Then
    expect(handleChange).toHaveBeenCalled();
  });

  it('should have the correct min value', () => {
    // Given
    const value = 50;

    // When
    render(<InputRange id="volume" label="Volume" value={value} onChange={() => {}} />);

    // Then
    const inputElement = screen.getByRole('slider');
    expect(inputElement).toHaveAttribute('min', '1');
  });
});
