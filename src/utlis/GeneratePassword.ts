export interface GeneratePasswordOptions {
  length: number;
  lowercase: boolean;
  uppercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

export function generatePawword(options: GeneratePasswordOptions) {
  const lowercaseChar = 'abcdefghijklmnopqrstuvwxyz'
  const uppercaseChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numberChar = '0123456789'
  const symbolChar = "!#$%&'()*+,-./:;<=>?@[]^_{|}~"

  let allChars = '';
  if (options.lowercase) {
    allChars += lowercaseChar;
  }

  if (options.uppercase) {
    allChars += uppercaseChar;
  }

  if (options.numbers) {
    allChars += numberChar;
  }

  if (options.symbols) {
    allChars += symbolChar;
  }

  if (allChars.length === 0) {
    allChars += lowercaseChar;
  }

  const length = options.length || 10;
  let password = '';
  for (let i = 0; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  return password;
}