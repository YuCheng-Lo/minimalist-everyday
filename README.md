# 拾光日常 | Minimalist Everyday Goods

這是一個基於 React 生態系開發的質感電商專案，專注於極簡設計物的呈現。本專案為六角學院 React 專業實戰班之個人作品。

## 🚀 線上預覽

https://yucheng-lo.github.io/minimalist-everyday/#/

## 🛠 核心技術棧 (Tech Stack)

- **Frontend:** React / Vite
- **State Management:** Redux Toolkit (RTK) / Redux Thunk
- **Routing:** React Router v6
- **Form Handling:** React Hook Form
- **Styling:** SCSS (Module) / Bootstrap 5 / Bootstrap Icons
- **API:** 六角學院課程專用 API (RESTful)

## ✨ 核心功能

- **嚴謹 RWD 佈局**：全站針對手機端（最小至 375px / iPhone SE）進行優化，確保無水平捲軸與破版現象。
- **購物車管理**：透過 Redux 全域管理購物狀態，支援非同步更新數量、刪除商品。
- **多階結帳流程**：包含購物車確認、收件人表單驗證（Email/電話格式檢查）、付款確認頁面。
- **後台管理系統**：支援產品的新增、刪除與狀態切換（1920px 最佳化配置）。
- **UI/UX 實踐**：
  - 注重介面細節與操作流程設計，提升使用體驗與流暢度。
  - 實作頁面切換時的 Loading 狀態與非同步訊息提示。

## 📦 如何在本地運行

1. `git clone https://github.com/YuCheng-Lo/minimalist-everyday`
2. `npm install`
3. 建立 `.env` 檔案並填入 `VITE_APP_API_PATH` 等資訊
4. `npm run dev`

## 👤 關於開發者

**Cheng**

- 專注於 React 前端開發
- 熟悉 Redux Toolkit、React Router、React Hook Form
- 具備基礎後端 API 開發經驗，能串接 RESTful API
