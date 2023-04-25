# Matcha Review Website | Taiwan
### 簡介
以 Node.js 中的 Express.js 框架，來製作抹茶評論網，讓使用者可觀看抹民們的抹茶推薦清單，登入後還能將評論過、不同地區或者有其他人推薦過等多種方式，查找出符合自己當下想尋找的在台好吃抹茶。

## 頁面呈現
<p float="left">
<img src="https://github.com/singingw/review/blob/main/Matcha Review Website.PNG" width="49%">
</p>

### 專案DEMO
[專案入口網站](https://safe-coast-85116.herokuapp.com/user/login)

### 功能說明
#### 登入相關功能
* 登入前可觀看抹民們的抹茶推薦清單。
* 登入後能夠以不同型式搜尋抹茶清單。
* 登入後還能對抹茶清單進行新增、評論、修改。

#### 抹茶清單的功能
* 使用者可對抹茶清單點選推薦，或取消推薦。
* 使用者也可點選收藏，或取消收藏。

#### 評論功能
* 使用者可以看抹民、一般大眾的評論。
* 使用者也可以將自己的意見加入抹茶清單中。

#### 編輯使用者資訊
* 使用者可以編輯自己的名稱、大頭照。

#### 最新動態列表
* 使用者可以看見，近期十個新增的抹茶清單或評論。

---
### 環境建置與需求
```
"Node.js": "16.14.0"
"connect-flash": "^0.1.1",
"dayjs": "^1.11.7",
"dotenv": "^16.0.3",
"express": "^4.18.2",
"express-handlebars": "^7.0.4",
"express-session": "^1.17.3",
"imgur": "^1.0.2",
"method-override": "^3.0.0",
"multer": "^1.4.5-lts.1",
"mysql2": "^3.2.0",
"passport": "^0.6.0",
"passport-google-oauth20": "^2.0.0",
"sequelize": "^6.31.0",
"sequelize-cli": "^6.6.0"
```

---

### 安裝步驟
#### 安裝Node.js
至[Node.js的官方網站](https://nodejs.org)下載適合本地規格的Node.js

#### 使用終端機下載本專案
```
git clone https://github.com/singingw/review.git
```

#### 透過終端機進入資料夾
```
cd review
```

#### 安裝相關套件
```
npm install
```

#### 確認安裝好MySQL，在MySQL輸入指令建立資料庫
至[MySQL workbench官網](https://dev.mysql.com/downloads/workbench/)下載資料庫軟體
```
create database matcha_sequelize;
```
#### 在終端機輸入指令，建立Model
```
npx sequelize db:migrate
```

#### 在終端機輸入指令，建立種子資料
```
npx sequelize db:seed:all
```


#### 在終端機輸入指令，建立.env檔
```
touch .env
```
#### 在.env檔中設定機密資料
```
SESSION_SECRET=自己設定一組密碼
IMGUR_CLIENT_ID=請至 https://imgur.com/ 申請
GOOGLE_ID = 請至 https://console.developers.google.com/ 申請
GOOGLE_SECRET = 請至 https://console.developers.google.com/ 申請
GOOGLE_CALLBACK = http://localhost:3000/auth/google/callback
```

#### 配置/config.json
config/config.json 開發與測試環境中的資料庫連接設置。
```
{
  "development": {
    "username": "root",
    "password": "<your_password>",
    "database": "matcha_sequelize",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

#### 在終端機輸入指令，啟動伺服器
```
npm run start
```
#### 確認伺服器連線
若看見終端機出現 App is listening on port 3000! 代表順利運行。

#### 若欲暫停使用，請在終端機輸入指令
```
ctrl + c
```