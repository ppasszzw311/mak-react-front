import React from 'react';
import styles from './Button.module.scss';

const Button = ({ children, variant = 'primary', ...props }) => {
  return (
    <button
      className={`${styles.button} ${styles[`button--${variant}`]}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 