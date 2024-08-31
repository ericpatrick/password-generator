import { PasswordSettingsModel } from "./PasswordSettings.model";

export interface PasswordForm {
  password: string;
  settings: PasswordSettingsModel;
}