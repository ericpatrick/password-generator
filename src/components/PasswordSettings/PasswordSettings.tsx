import { Checkbox } from "../Checkbox/Checkbox";
import { InputRange } from "../InputRange/InputRange";
import { PasswordSettingsModel } from "./models/PasswordSettings.model";

interface PasswordSettingsProps {
  settings: PasswordSettingsModel;
  onSettingsChange: (settings: PasswordSettingsModel) => void
}

export function PasswordSettings({settings, onSettingsChange}: PasswordSettingsProps) {

  function handleLengthChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value;
    onSettingsChange({...settings, length: parseInt(newValue)})
  }
  
  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>, index: number) {
    const newValue = event.target.checked;
    const newCheckboxes = [...settings.checkboxes.map(item => ({...item}))];
    newCheckboxes[index].value = newValue;
    const isAllCheckboxesUnselected = newCheckboxes.filter((item) => item.value).length === 0
    if (!isAllCheckboxesUnselected) {
      onSettingsChange({...settings, checkboxes: newCheckboxes});
    } else {
      alert('You can not unselect all checkboxes');
    }
  }

  const checkboxes = settings.checkboxes.map((checkbox, index) => (
    <Checkbox
      key={checkbox.key} 
      id={checkbox.key} 
      label={`include ${checkbox.key}`} 
      value={checkbox.value}
      onChange={(event) => handleCheckboxChange(event, index)}
    />
  ));
  return (
    <>
      <InputRange id="length" label="Character Length" value={settings.length} onChange={handleLengthChange} />
      {checkboxes}
    </>
  );
}