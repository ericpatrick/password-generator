import styles from './Checkbox.module.scss'

interface CheckboxProps {
  id: string;
  label: string;
  value: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function Checkbox({id, label, value, onChange}: CheckboxProps) {
  return (
    <>
      <div className={styles['input-wrapper']}>
        <input id={id} type="checkbox" checked={value} onChange={onChange} />
        <label htmlFor={id}>{label}</label>
      </div>
    </>
  );
}