export const checkInRecords = [
  {
    id: 1,
    userId: 1,
    userName: '管理員',
    checkInTime: '2024-01-01T09:00:00Z',
    checkOutTime: '2024-01-01T18:00:00Z',
    status: 'completed',
    notes: '正常打卡'
  },
  {
    id: 2,
    userId: 2,
    userName: '一般用戶',
    checkInTime: '2024-01-01T09:05:00Z',
    checkOutTime: '2024-01-01T17:55:00Z',
    status: 'completed',
    notes: '正常打卡'
  },
  {
    id: 3,
    userId: 1,
    userName: '管理員',
    checkInTime: '2024-01-02T09:10:00Z',
    checkOutTime: null,
    status: 'inProgress',
    notes: '尚未打卡下班'
  }
]; 