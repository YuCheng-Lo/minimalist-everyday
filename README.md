# 拾光日常 | Minimalist Everyday Goods

一個完整的前端電商系統，涵蓋商品瀏覽、購物車、結帳流程與後台管理，專注於狀態管理、非同步流程控制與使用者體驗優化。

本專案串接第三方 RESTful API，模擬真實電商應用場景，並著重於處理前端常見的資料同步、表單驗證、權限控管與錯誤處理等實務問題。

---

## 🚀 線上預覽

[點此進入](https://yucheng-lo.github.io/minimalist-everyday/#/)

---

## 🛠 技術棧 (Tech Stack)

- **Frontend:** React / Vite
- **State Management:** Redux Toolkit (RTK) / Redux Thunk
- **Routing:** React Router v6
- **Form Handling:** React Hook Form
- **Styling:** SCSS (Module) / Bootstrap 5 / Bootstrap Icons
- **API:** 六角學院課程專用 RESTful API

---

## ✨ 技術挑戰與解決方案

- 使用 **Redux Toolkit** 管理購物車與訂單狀態，解決跨頁資料同步問題
- 實作 **Axios 攔截器** 統一處理 API 錯誤與 Token 驗證流程
- 設計 **多步驟結帳流程**，確保表單驗證、付款流程與訂單狀態一致
- 建立 **路由守衛** 機制，保護後台頁面存取權限
- 強化 **RWD 與 UI/UX**，針對手機端（最小 375px）優化，避免破版與水平捲軸

---

## 🛒 核心功能

- 嚴謹 RWD 佈局，適配各裝置與螢幕尺寸
- 購物車管理：支援非同步更新商品數量、刪除、結帳流程
- 後台管理系統：支援商品新增、刪除與狀態切換
- 多步驟結帳流程：收件人表單驗證、付款確認頁面
- UI/UX 實踐：頁面切換 Loading 狀態、非同步訊息提示

---

## 📦 本地運行

1. 複製專案並安裝依賴

```bash
git clone https://github.com/YuCheng-Lo/minimalist-everyday
cd minimalist-everyday
npm install
```

2. 建立 .env 檔案，內容如下：

```env
VITE_URL=六角學院專屬 API
VITE_PATH=你的專屬 API Path
```

3. 啟動開發伺服器

```bash
npm run dev
```

> **Note:** 基於資訊安全與 API 使用規範，本專案不公開實務運行的 `.env` 變數。若需完整體驗功能，建議直接造訪 [線上預覽](https://yucheng-lo.github.io/minimalist-everyday/#/)。

## 👤 關於開發者

**Cheng**

- 專注於 React 前端開發
- 熟悉 Redux Toolkit、React Router、React Hook Form
- 具備串接 RESTful API 的能力與前端工程思維
