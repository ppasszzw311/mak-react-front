import { http } from 'msw';
import { users } from '../data/users';

export const authHandlers = [
  // 登入 API
  http.post('/api/auth/login', async ({ request }) => {
    const { username, password } = await request.json();
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
      return new Response(
        JSON.stringify({
          message: '用戶名或密碼錯誤'
        }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    return new Response(
      JSON.stringify({
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
          role: user.role
        },
        token: user.token
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }),

  // 獲取當前用戶信息
  http.get('/api/auth/me', ({ request }) => {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    const user = users.find(u => u.token === token);

    if (!user) {
      return new Response(
        JSON.stringify({
          message: '未授權'
        }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    return new Response(
      JSON.stringify({
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
          role: user.role
        }
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  })
]; 