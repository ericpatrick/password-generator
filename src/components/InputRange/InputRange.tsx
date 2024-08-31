import styles from './InputRange.module.scss';

interface InputRangeProps {
  id: string;
  label: string;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function InputRange({id, label, value, onChange}: InputRangeProps) {
  return (
    <div className={styles['input-wrapper']}>
      <label htmlFor={id}>{`${label} ${value}`}</label>
      <input type='range' id={id} min={1} value={value} onChange={onChange} />
    </div>
  );
}