import React, { useState, useEffect } from 'react';
import styles from './CheckIn.module.scss';
import Button from '@/components/Button/Button';

const CheckIn = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [checkInStatus, setCheckInStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 獲取用戶信息
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('/api/auth/me', {
          headers: {
            'Authorization': 'Bearer mock-admin-token'
          }
        });
        const data = await response.json();
        setUserInfo(data.user);
      } catch (err) {
        setError('獲取用戶信息失敗');
      }
    };

    fetchUserInfo();
  }, []);

  // 獲取打卡狀態
  useEffect(() => {
    const fetchCheckInStatus = async () => {
      if (!userInfo) return;

      try {
        const response = await fetch(`/api/check-in/records?userId=${userInfo.id}`);
        const { data } = await response.json();
        const todayRecord = data.find(record => {
          const recordDate = new Date(record.checkInTime).toDateString();
          const today = new Date().toDateString();
          return recordDate === today && record.status === 'inProgress';
        });
        setCheckInStatus(todayRecord);
      } catch (err) {
        setError('獲取打卡狀態失敗');
      }
    };

    fetchCheckInStatus();
  }, [userInfo]);

  const handleCheckIn = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/check-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: userInfo.id,
          userName: userInfo.name,
          notes: '正常打卡'
        })
      });

      if (!response.ok) {
        throw new Error('打卡失敗');
      }

      const data = await response.json();
      setCheckInStatus(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/check-out', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: userInfo.id
        })
      });

      if (!response.ok) {
        throw new Error('打卡失敗');
      }

      const data = await response.json();
      setCheckInStatus(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!userInfo) {
    return <div className={styles.loading}>載入中...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>打卡系統</h1>
      
      <div className={styles.userInfo}>
        <p>用戶名稱：{userInfo.name}</p>
        <p>用戶角色：{userInfo.role}</p>
      </div>

      <div className={styles.status}>
        {checkInStatus ? (
          <div className={styles.checkInStatus}>
            <p>上班時間：{new Date(checkInStatus.checkInTime).toLocaleString()}</p>
            <p>狀態：已打卡上班</p>
            <Button 
              variant="primary" 
              onClick={handleCheckOut}
              disabled={loading}
            >
              {loading ? '處理中...' : '打卡下班'}
            </Button>
          </div>
        ) : (
          <div className={styles.checkInStatus}>
            <p>狀態：尚未打卡</p>
            <Button 
              variant="primary" 
              onClick={handleCheckIn}
              disabled={loading}
            >
              {loading ? '處理中...' : '打卡上班'}
            </Button>
          </div>
        )}
      </div>

      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default CheckIn;  