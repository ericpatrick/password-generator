import { render, screen, fireEvent } from '@testing-library/react';
import { PasswordSettings } from '../PasswordSettings';
import { PasswordSettingsModel } from '../models/PasswordSettings.model';

describe('PasswordSettings', () => {
  // Given
  const initialSettings: PasswordSettingsModel = {
    length: 8,
    checkboxes: [
      { key: 'uppercase', value: true },
      { key: 'lowercase', value: true },
      { key: 'numbers', value: true },
      { key: 'symbols', value: true },
    ],
  };
  
  const onSettingsChangeMock = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should render all checkboxes and range input', () => {
    // When
    render(<PasswordSettings settings={initialSettings} onSettingsChange={onSettingsChangeMock} />);
    
    // Then
    expect(screen.getByLabelText(/Character Length 8/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/include uppercase/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/include lowercase/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/include numbers/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/include symbols/i)).toBeInTheDocument();
  });

  it('should call onSettingsChange with updated length when range input is changed', () => {
    // Given
    render(<PasswordSettings settings={initialSettings} onSettingsChange={onSettingsChangeMock} />);
    const rangeInput = screen.getByLabelText(/Character Length 8/i);

    // When
    fireEvent.change(rangeInput, { target: { value: '12' } });

    // Then
    expect(onSettingsChangeMock).toHaveBeenCalledWith({
      ...initialSettings,
      length: 12,
    });
  });

  it('should call onSettingsChange with updated checkbox value when a checkbox is toggled', () => {
    // Given
    render(<PasswordSettings settings={initialSettings} onSettingsChange={onSettingsChangeMock} />);
    const uppercaseCheckbox = screen.getByLabelText(/include uppercase/i);

    // When
    fireEvent.click(uppercaseCheckbox);

    // Then
    expect(onSettingsChangeMock).toHaveBeenCalledWith({
      ...initialSettings,
      checkboxes: [
        { key: 'uppercase', value: false },
        { key: 'lowercase', value: true },
        { key: 'numbers', value: true },
        { key: 'symbols', value: true },
      ],
    });
  });

  it('should show an alert and not call onSettingsChange when all checkboxes are unselected', () => {
    // Given
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
    const settingsWithSingleCheckbox: PasswordSettingsModel = {
      ...initialSettings,
      checkboxes: [
        { key: 'uppercase', value: true },
        { key: 'lowercase', value: false },
        { key: 'numbers', value: false },
        { key: 'symbols', value: false },
      ],
    };

    render(<PasswordSettings settings={settingsWithSingleCheckbox} onSettingsChange={onSettingsChangeMock} />);
    const uppercaseCheckbox = screen.getByLabelText(/include uppercase/i);

    // When
    fireEvent.click(uppercaseCheckbox);

    // Then
    expect(alertMock).toHaveBeenCalledWith('You can not unselect all checkboxes');
    expect(onSettingsChangeMock).not.toHaveBeenCalled();
    alertMock.mockRestore();
  });
});
