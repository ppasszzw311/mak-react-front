import { http } from 'msw';
import { products } from '../data/products';

export const productHandlers = [
  // 獲取所有商品
  http.get('/api/products', () => {
    return new Response(
      JSON.stringify({
        data: products,
        total: products.length
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }),

  // 獲取單個商品
  http.get('/api/products/:id', ({ params }) => {
    const { id } = params;
    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
      return new Response(
        JSON.stringify({
          message: '商品不存在'
        }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    return new Response(
      JSON.stringify(product),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }),

  // 更新商品庫存
  http.patch('/api/products/:id/stock', async ({ params, request }) => {
    const { id } = params;
    const { stock } = await request.json();
    const productIndex = products.findIndex(p => p.id === parseInt(id));

    if (productIndex === -1) {
      return new Response(
        JSON.stringify({
          message: '商品不存在'
        }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    products[productIndex].stock = stock;
    products[productIndex].updatedAt = new Date().toISOString();

    return new Response(
      JSON.stringify(products[productIndex]),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }),

  // 創建新商品
  http.post('/api/products', async ({ request }) => {
    const body = await request.json();
    const newProduct = {
      ...body,
      id: products.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    products.push(newProduct);

    return new Response(
      JSON.stringify(newProduct),
      {
        status: 201,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  })
]; 