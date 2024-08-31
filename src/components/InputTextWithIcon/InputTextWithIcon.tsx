import styles from './InputTextWithIcon.module.scss';
import copyIcon from '../../assets/copy-icon.svg';

interface InputTextWithIconProps {
  inputValue: string;
}

export function InputTextWithIcon({ inputValue }: InputTextWithIconProps) {

  function handleCopyClick() {
    navigator.clipboard.writeText(inputValue);
    alert('Password copied!');
  }

  return (
    <div className={styles['input-wrapper']}> 
        <input type="text" readOnly value={inputValue} /> 
        <button onClick={handleCopyClick}> 
            <img src={copyIcon} alt="copy button" />
        </button> 
    </div> 
  );
}