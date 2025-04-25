import React from 'react';
import styles from './DateRangePicker.module.scss';

const DateRangePicker = ({
  label,
  startName,
  endName,
  startValue,
  endValue,
  onStartChange,
  onEndChange,
  error,
  required = false,
  disabled = false,
  className = ''
}) => {
  return (
    <div className={`${styles.inputGroup} ${className}`}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={styles.dateRange}>
        <div className={styles.dateInput}>
          <input
            type="date"
            id={startName}
            name={startName}
            value={startValue}
            onChange={onStartChange}
            disabled={disabled}
            className={`${styles.input} ${error ? styles.error : ''}`}
          />
          <label htmlFor={startName} className={styles.subLabel}>
            開始日期
          </label>
        </div>
        <span className={styles.separator}>至</span>
        <div className={styles.dateInput}>
          <input
            type="date"
            id={endName}
            name={endName}
            value={endValue}
            onChange={onEndChange}
            disabled={disabled}
            className={`${styles.input} ${error ? styles.error : ''}`}
          />
          <label htmlFor={endName} className={styles.subLabel}>
            結束日期
          </label>
        </div>
      </div>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

export default DateRangePicker; 