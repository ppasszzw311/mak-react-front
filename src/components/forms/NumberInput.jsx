import React from 'react';
import styles from './NumberInput.module.scss';

const NumberInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  min,
  max,
  step = 1,
  required = false,
  disabled = false,
  className = ''
}) => {
  return (
    <div className={`${styles.inputGroup} ${className}`}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <input
        type="number"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className={`${styles.input} ${error ? styles.error : ''}`}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

export default NumberInput; 