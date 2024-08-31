import { useState } from 'react';
import { InputTextWithIcon } from './components/InputTextWithIcon/InputTextWithIcon'
import { PasswordSettings } from './components/PasswordSettings/PasswordSettings';
import { PasswordForm } from './components/PasswordSettings/models/PasswordForm.mode';
import { PasswordSettingsModel } from './components/PasswordSettings/models/PasswordSettings.model';
import styles from './App.module.scss';
import { generatePawword } from './utlis/GeneratePassword';

function App() {
  const [form, setForm] = useState<PasswordForm>({
    password: '',
    settings: {
      length: 10,
      checkboxes: [
        {
          key: 'lowercase',
          value: true
        },
        {
          key: 'uppercase',
          value: false
        },
        {
          key: 'numbers',
          value: false
        },
        {
          key: 'symbols',
          value: false
        }
      ]
    }
  });

  function handleGenerateClick() {
    const newPassword = generatePawword({
      length: form.settings.length,
      lowercase: form.settings.checkboxes[0].value,
      uppercase: form.settings.checkboxes[1].value,
      numbers: form.settings.checkboxes[2].value,
      symbols: form.settings.checkboxes[3].value,
    });
    setForm(oldValue => ({...oldValue, password: newPassword}));
  }

  function handleFormSettings(settings: PasswordSettingsModel) {
    setForm(oldValue => ({...oldValue, settings}));
  }

  return (
    <main className={styles.container}>
      <h1>Password generator</h1>
      <InputTextWithIcon inputValue={form.password} />
      <PasswordSettings settings={form.settings} onSettingsChange={handleFormSettings} />
      <button className={styles['generate-button']} onClick={handleGenerateClick} >Generate</button>
    </main>
  )
}

export default App
