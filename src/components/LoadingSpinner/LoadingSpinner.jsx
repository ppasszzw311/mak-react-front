import React from 'react';
import styles from './LoadingSpinner.module.scss';

const LoadingSpinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
      <p className={styles.loadingText}>載入中...</p>
    </div>
  );
};

export default LoadingSpinner; 