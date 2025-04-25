# 移除 Mock 設定指南

當你已經成功接好真正的 API 後，可以按照以下步驟移除 Mock 設定：

## 1. 移除相關文件

刪除以下文件和目錄：
- `src/mocks/` 整個目錄
- `public/mockServiceWorker.js`

## 2. 修改 main.jsx

在 `src/main.jsx` 中，移除或註釋掉以下代碼：
```javascript
if (import.meta.env.DEV) {
  import('./mocks/browser.js').then(({ worker }) => {
    worker.start();
  });
}
```

## 3. 修改 vite.config.js

在 `vite.config.js` 中，移除或註釋掉以下代碼：
```javascript
{
  name: 'msw',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url === '/mockServiceWorker.js') {
        res.setHeader('Content-Type', 'application/javascript');
      }
      next();
    });
  }
}
```

## 4. 移除依賴

在 `package.json` 中移除以下依賴：
```json
{
  "devDependencies": {
    "msw": "^x.x.x"
  }
}
```

然後運行：
```bash
npm uninstall msw
```

## 5. 檢查 API 調用

確保所有的 API 調用都已經指向真實的 API 端點，而不是 Mock 的端點。

## 6. 測試步驟

在移除 Mock 之前，建議進行以下測試：

### 6.1 API 端點測試

1. 使用 Postman 或類似的工具測試所有 API 端點：
   ```bash
   # 登入 API
   POST /api/auth/login
   {
     "username": "test",
     "password": "test123"
   }

   # 獲取用戶信息
   GET /api/auth/me
   Headers: Authorization: Bearer {token}

   # 獲取商品列表
   GET /api/products

   # 打卡上班
   POST /api/check-in
   {
     "userId": 1,
     "userName": "測試用戶",
     "notes": "正常打卡"
   }

   # 打卡下班
   POST /api/check-out
   {
     "userId": 1
   }
   ```

2. 確認每個 API 的：
   - 請求格式是否正確
   - 響應格式是否與 Mock 一致
   - 錯誤處理是否正確
   - 狀態碼是否符合預期

### 6.2 功能測試

1. 登入功能：
   - 正確的用戶名和密碼
   - 錯誤的用戶名或密碼
   - 空白的用戶名或密碼
   - Token 過期或無效的情況

2. 商品管理：
   - 商品列表顯示
   - 商品詳情查看
   - 庫存更新
   - 新商品創建

3. 打卡功能：
   - 正常打卡上班
   - 正常打卡下班
   - 重複打卡
   - 異常打卡（如未打卡上班就打卡下班）

### 6.3 錯誤處理測試

1. 網絡錯誤：
   - 斷網情況
   - 網絡超時
   - 服務器無響應

2. 數據錯誤：
   - 無效的數據格式
   - 缺失必要字段
   - 數據類型錯誤

3. 權限錯誤：
   - 未登入訪問
   - Token 過期
   - 權限不足

### 6.4 性能測試

1. 響應時間：
   - 頁面加載時間
   - API 響應時間
   - 數據處理時間

2. 並發測試：
   - 多用戶同時操作
   - 高頻率請求
   - 大量數據處理

### 6.5 測試工具推薦

1. API 測試：
   - Postman
   - Insomnia
   - Thunder Client (VS Code 插件)

2. 自動化測試：
   - Jest
   - React Testing Library
   - Cypress

3. 性能測試：
   - Chrome DevTools
   - Lighthouse
   - WebPageTest

## 7. 測試記錄

建議在測試過程中記錄以下信息：

1. 測試環境：
   - 瀏覽器版本
   - 操作系統
   - 網絡環境

2. 測試結果：
   - 通過的測試項
   - 失敗的測試項
   - 發現的問題
   - 解決方案

3. 性能數據：
   - 頁面加載時間
   - API 響應時間
   - 資源使用情況

## 8. 測試報告模板

```markdown
# API 測試報告

## 測試環境
- 日期：YYYY-MM-DD
- 瀏覽器：Chrome XX.XX
- 操作系統：Windows XX
- 網絡：4G/5G/WiFi

## 測試結果
### 登入功能
- [x] 正常登入
- [x] 錯誤密碼
- [x] 空用戶名
- [x] Token 過期

### 商品管理
- [x] 商品列表
- [x] 商品詳情
- [x] 庫存更新
- [x] 新商品創建

### 打卡功能
- [x] 打卡上班
- [x] 打卡下班
- [x] 重複打卡
- [x] 異常打卡

## 發現的問題
1. 問題描述
   - 重現步驟
   - 預期結果
   - 實際結果
   - 解決方案

## 性能數據
- 平均頁面加載時間：XXX ms
- 平均 API 響應時間：XXX ms
- 資源使用情況：正常/異常

## 結論
[通過/不通過] 測試，建議 [移除/保留] Mock 設定。
```

## 注意事項

1. 在移除 Mock 設定之前，請確保：
   - 所有 API 端點都已經正確配置
   - 真實 API 的響應格式與 Mock 數據格式一致
   - 錯誤處理邏輯已經調整為適應真實 API

2. 建議在移除 Mock 之前：
   - 先進行完整的測試
   - 確保所有功能都能正常工作
   - 準備好回滾方案

3. 如果使用環境變量來控制 Mock 的開關，可以考慮保留相關代碼，但通過環境變量來控制是否啟用 Mock。

## 回滾方案

如果移除 Mock 後發現問題，可以：
1. 恢復之前備份的文件
2. 重新安裝 msw 依賴
3. 重新生成 mockServiceWorker.js
4. 恢復相關配置

這樣可以快速回到使用 Mock 的狀態，確保開發工作不受影響。 