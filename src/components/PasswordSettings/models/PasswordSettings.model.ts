export interface PasswordSettingsModel {
  length: number;
  checkboxes: PasswordCompositionOption[];
}

interface PasswordCompositionOption {
  key: string;
  value: boolean;
}