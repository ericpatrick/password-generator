import { GeneratePasswordOptions, generatePawword } from "../GeneratePassword";

describe('generatePassword', () => {

  it('should generate a password with the specified length', () => {
    // Given
    const options: GeneratePasswordOptions = {
      length: 12,
      lowercase: true,
      uppercase: true,
      numbers: true,
      symbols: true,
    };

    // When
    const password = generatePawword(options);

    // Then
    expect(password).toHaveLength(12);
  });

  it('should include lowercase characters if specified', () => {
    // Given
    const options: GeneratePasswordOptions = {
      length: 10,
      lowercase: true,
      uppercase: false,
      numbers: false,
      symbols: false,
    };

    // When
    const password = generatePawword(options);

    // Then
    expect(password).toMatch(/[a-z]/);
  });

  it('should include uppercase characters if specified', () => {
    // Given
    const options: GeneratePasswordOptions = {
      length: 10,
      lowercase: false,
      uppercase: true,
      numbers: false,
      symbols: false,
    };

    // When
    const password = generatePawword(options);

    // Then
    expect(password).toMatch(/[A-Z]/);
  });

  it('should include numbers if specified', () => {
    // Given
    const options: GeneratePasswordOptions = {
      length: 10,
      lowercase: false,
      uppercase: false,
      numbers: true,
      symbols: false,
    };

    // When
    const password = generatePawword(options);

    // Then
    expect(password).toMatch(/[0-9]/);
  });

  it('should include symbols if specified', () => {
    // Given
    const options: GeneratePasswordOptions = {
      length: 10,
      lowercase: false,
      uppercase: false,
      numbers: false,
      symbols: true,
    };

    // When
    const password = generatePawword(options);

    // Then
    expect(password).toMatch(/[!#$%&'()*+,-./:;<=>?@[\]^_{|}~]/);
  });

  it('should generate a password with lowercase characters by default if no options are selected', () => {
    // Given
    const options: GeneratePasswordOptions = {
      length: 10,
      lowercase: false,
      uppercase: false,
      numbers: false,
      symbols: false,
    };

    // When
    const password = generatePawword(options);

    // Then
    expect(password).toMatch(/[a-z]/);
  });

  it('should generate a password with a default length of 10 if no length is specified', () => {
    // Given
    const options: GeneratePasswordOptions = {
      length: 0,
      lowercase: true,
      uppercase: true,
      numbers: true,
      symbols: true,
    };

    // When
    const password = generatePawword(options);

    // Then
    expect(password).toHaveLength(10);
  });
});
