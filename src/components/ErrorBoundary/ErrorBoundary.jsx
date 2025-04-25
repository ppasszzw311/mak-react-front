import React, { Component } from 'react';
import styles from './ErrorBoundary.module.scss';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    // 這裡可以添加錯誤日誌上報邏輯
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorContainer}>
          <h2 className={styles.errorTitle}>抱歉，發生了一些錯誤</h2>
          <p className={styles.errorMessage}>
            我們正在努力修復這個問題。請稍後再試。
          </p>
          {process.env.NODE_ENV === 'development' && (
            <details className={styles.errorDetails}>
              <summary>錯誤詳情</summary>
              <pre className={styles.errorStack}>
                {this.state.error && this.state.error.toString()}
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
          <button 
            className={styles.retryButton}
            onClick={() => window.location.reload()}
          >
            重新載入頁面
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 