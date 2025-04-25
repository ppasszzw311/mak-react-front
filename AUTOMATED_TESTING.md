# React 自動化測試指南

## 什麼是自動化測試？

自動化測試是指使用軟件工具來執行預先編寫的測試用例，以驗證應用程序的功能是否正常。相比手動測試，自動化測試具有以下優勢：

1. 提高效率：可以快速執行大量測試用例
2. 減少人為錯誤：避免人工測試中的疏忽
3. 可重複性：可以重複執行相同的測試
4. 持續集成：可以集成到 CI/CD 流程中
5. 早期發現問題：在開發過程中就能發現問題

## React 自動化測試工具

### 1. Jest

Jest 是 Facebook 開發的 JavaScript 測試框架，特別適合 React 應用：

```bash
# 安裝 Jest
npm install --save-dev jest @testing-library/jest-dom
```

基本測試示例：
```javascript
// sum.test.js
function sum(a, b) {
  return a + b;
}

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

### 2. React Testing Library

React Testing Library 是一個輕量級的測試工具，專注於測試組件的行為：

```bash
# 安裝 React Testing Library
npm install --save-dev @testing-library/react @testing-library/user-event
```

組件測試示例：
```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

test('login form submits correctly', () => {
  const handleSubmit = jest.fn();
  render(<Login onSubmit={handleSubmit} />);
  
  // 填寫表單
  fireEvent.change(screen.getByLabelText(/username/i), {
    target: { value: 'testuser' }
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: 'password123' }
  });
  
  // 提交表單
  fireEvent.click(screen.getByText(/login/i));
  
  // 驗證提交函數被調用
  expect(handleSubmit).toHaveBeenCalledWith({
    username: 'testuser',
    password: 'password123'
  });
});
```

### 3. Cypress

Cypress 是一個端到端的測試框架，可以模擬真實用戶操作：

```bash
# 安裝 Cypress
npm install --save-dev cypress
```

端到端測試示例：
```javascript
// cypress/integration/login.spec.js
describe('Login', () => {
  it('should login successfully', () => {
    cy.visit('/login');
    cy.get('[data-testid=username]').type('testuser');
    cy.get('[data-testid=password]').type('password123');
    cy.get('[data-testid=submit]').click();
    cy.url().should('include', '/dashboard');
  });
});
```

## 測試類型

### 1. 單元測試（Unit Tests）

測試單個函數或組件：

```javascript
// Button.test.js
import { render, screen } from '@testing-library/react';
import Button from './Button';

test('renders button with correct text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```

### 2. 組件測試（Component Tests）

測試組件的交互和狀態：

```javascript
// Counter.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

test('increments counter when button is clicked', () => {
  render(<Counter />);
  const button = screen.getByText('Increment');
  fireEvent.click(button);
  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});
```

### 3. 集成測試（Integration Tests）

測試多個組件一起工作：

```javascript
// LoginForm.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from './LoginForm';
import { AuthProvider } from './AuthContext';

test('login flow works correctly', async () => {
  render(
    <AuthProvider>
      <LoginForm />
    </AuthProvider>
  );

  // 填寫登入信息
  fireEvent.change(screen.getByLabelText(/username/i), {
    target: { value: 'testuser' }
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: 'password123' }
  });

  // 提交表單
  fireEvent.click(screen.getByText(/login/i));

  // 驗證登入成功
  await screen.findByText(/welcome/i);
});
```

### 4. 端到端測試（E2E Tests）

測試完整的用戶流程：

```javascript
// cypress/integration/checkin.spec.js
describe('Check-in Flow', () => {
  it('should complete check-in process', () => {
    // 登入
    cy.visit('/login');
    cy.get('[data-testid=username]').type('testuser');
    cy.get('[data-testid=password]').type('password123');
    cy.get('[data-testid=submit]').click();

    // 打卡上班
    cy.visit('/check-in');
    cy.get('[data-testid=check-in]').click();
    cy.get('[data-testid=status]').should('contain', '已打卡');

    // 打卡下班
    cy.get('[data-testid=check-out]').click();
    cy.get('[data-testid=status]').should('contain', '已完成');
  });
});
```

## 測試最佳實踐

1. 測試行為而不是實現：
   ```javascript
   // 不好的做法
   test('uses useState hook', () => {
     // 測試實現細節
   });

   // 好的做法
   test('updates count when button is clicked', () => {
     // 測試組件行為
   });
   ```

2. 使用描述性的測試名稱：
   ```javascript
   // 不好的做法
   test('test 1', () => {});

   // 好的做法
   test('should display error message when login fails', () => {});
   ```

3. 避免測試內部狀態：
   ```javascript
   // 不好的做法
   test('state is updated', () => {
     // 直接測試組件狀態
   });

   // 好的做法
   test('shows success message after submission', () => {
     // 測試可見的行為
   });
   ```

4. 使用測試數據：
   ```javascript
   const mockUser = {
     id: 1,
     username: 'testuser',
     name: 'Test User'
   };

   test('displays user information', () => {
     render(<UserProfile user={mockUser} />);
     expect(screen.getByText('Test User')).toBeInTheDocument();
   });
   ```

## 測試配置

在 `package.json` 中添加測試腳本：

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "cypress:open": "cypress open",
    "cypress:run": "cypress run"
  }
}
```

Jest 配置文件 `jest.config.js`：

```javascript
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/index.js',
    '!src/reportWebVitals.js'
  ]
};
```

## 持續集成

在 GitHub Actions 中設置自動化測試：

```yaml
# .github/workflows/test.yml
name: Test
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
      - name: Run Cypress tests
        run: npm run cypress:run
```

## 常見問題解決

1. 模擬 API 調用：
   ```javascript
   import { rest } from 'msw';
   import { setupServer } from 'msw/node';

   const server = setupServer(
     rest.get('/api/user', (req, res, ctx) => {
       return res(ctx.json({ name: 'Test User' }));
     })
   );

   beforeAll(() => server.listen());
   afterEach(() => server.resetHandlers());
   afterAll(() => server.close());
   ```

2. 處理異步操作：
   ```javascript
   test('loads and displays user data', async () => {
     render(<UserProfile />);
     await screen.findByText('Loading...');
     await screen.findByText('Test User');
   });
   ```

3. 測試路由：
   ```javascript
   import { MemoryRouter } from 'react-router-dom';

   test('navigates to dashboard after login', () => {
     render(
       <MemoryRouter>
         <App />
       </MemoryRouter>
     );
     // 測試路由導航
   });
   ```

## 測試覆蓋率報告

生成測試覆蓋率報告：

```bash
npm run test:coverage
```

這將生成一個覆蓋率報告，顯示：
- 哪些代碼被測試覆蓋
- 哪些代碼沒有被測試
- 行覆蓋率、分支覆蓋率等指標

## 總結

自動化測試是確保 React 應用質量的重要手段。通過使用 Jest、React Testing Library 和 Cypress 等工具，我們可以：

1. 編寫可靠的單元測試
2. 測試組件交互
3. 進行端到端測試
4. 集成到 CI/CD 流程
5. 持續監控代碼質量

建議從簡單的測試開始，逐步建立完整的測試體系，確保應用的穩定性和可靠性。 