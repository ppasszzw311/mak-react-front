import { http } from 'msw';
import { checkInRecords } from '../data/checkInRecords';

export const checkInHandlers = [
  // 獲取所有打卡記錄
  http.get('/api/check-in/records', ({ request }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    const startDate = url.searchParams.get('startDate');
    const endDate = url.searchParams.get('endDate');
    
    let filteredRecords = [...checkInRecords];

    if (userId) {
      filteredRecords = filteredRecords.filter(record => record.userId === parseInt(userId));
    }

    if (startDate && endDate) {
      filteredRecords = filteredRecords.filter(record => {
        const checkInDate = new Date(record.checkInTime).toDateString();
        return checkInDate >= new Date(startDate).toDateString() && 
               checkInDate <= new Date(endDate).toDateString();
      });
    }

    return new Response(
      JSON.stringify({
        data: filteredRecords,
        total: filteredRecords.length
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }),

  // 打卡上班
  http.post('/api/check-in', async ({ request }) => {
    const { userId, userName, notes } = await request.json();
    const newRecord = {
      id: checkInRecords.length + 1,
      userId,
      userName,
      checkInTime: new Date().toISOString(),
      checkOutTime: null,
      status: 'inProgress',
      notes: notes || '正常打卡'
    };

    checkInRecords.push(newRecord);

    return new Response(
      JSON.stringify(newRecord),
      {
        status: 201,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }),

  // 打卡下班
  http.post('/api/check-out', async ({ request }) => {
    const { userId } = await request.json();
    const recordIndex = checkInRecords.findIndex(
      record => record.userId === userId && record.status === 'inProgress'
    );

    if (recordIndex === -1) {
      return new Response(
        JSON.stringify({
          message: '找不到未完成的打卡記錄'
        }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    checkInRecords[recordIndex].checkOutTime = new Date().toISOString();
    checkInRecords[recordIndex].status = 'completed';

    return new Response(
      JSON.stringify(checkInRecords[recordIndex]),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  })
]; 