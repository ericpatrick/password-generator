import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from '../Checkbox';

describe('Checkbox', () => {
  const defaultProps = {
    id: 'test-checkbox',
    label: 'Test Label',
    value: false,
    onChange: vi.fn(),
  };

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the checkbox with the correct label', () => {
    // Given the default props
    const { id, label } = defaultProps;

    // When the component is rendered
    render(<Checkbox {...defaultProps} />);

    // Then the checkbox input and label should be rendered
    const checkbox = screen.getByLabelText(label) as HTMLInputElement;
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.id).toBe(id);
  });

  it('applies the correct value to the checkbox', () => {
    // Given the checkbox value is true
    const updatedProps = { ...defaultProps, value: true };

    // When the component is rendered
    render(<Checkbox {...updatedProps} />);

    // Then the checkbox should be checked
    const checkbox = screen.getByLabelText(updatedProps.label) as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it('calls onChange handler when the checkbox is clicked', () => {
    // Given the default props
    const { onChange } = defaultProps;

    // When the checkbox is clicked
    render(<Checkbox {...defaultProps} />);
    const checkbox = screen.getByLabelText(defaultProps.label) as HTMLInputElement;
    fireEvent.click(checkbox);

    // Then the onChange handler should be called once
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('toggles the checkbox value when clicked', () => {
    // Given the checkbox value is initially false
    let value = false;
    const handleChange = () => {
      value = !value;
    };
    const updatedProps = { ...defaultProps, value, onChange: handleChange };

    // When the checkbox is clicked
    render(<Checkbox {...updatedProps} />);
    const checkbox = screen.getByLabelText(updatedProps.label) as HTMLInputElement;
    fireEvent.click(checkbox);

    // Then the value should toggle to true
    expect(value).toBe(true);
  });
});
