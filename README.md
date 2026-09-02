# ShowKong

ระบบเว็บแอปพลิเคชัน ShowKong พัฒนาด้วย **Vanilla HTML/JS**, **Tailwind CSS** และ **Supabase**

---

## 🛠️ Tech Stack

- **Frontend**: Vanilla HTML5, Vanilla JavaScript (ES Modules) via [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Backend / Database**: [Supabase](https://supabase.com/) (`@supabase/supabase-js`)

---

## 📁 โครงสร้างโปรเจกต์ (Project Structure)

```text
ShowKong/
├── client/                     # โค้ดฝั่ง Frontend
│   ├── src/
│   │   ├── lib/
│   │   │   └── supabase.js     # เชื่อมต่อ Supabase Client
│   │   ├── main.js             # Entry Point JavaScript
│   │   └── style.css           # Tailwind CSS styles
│   ├── .env.example            # ตัวอย่างการตั้งค่า Environment Variables
│   ├── index.html              # หน้าเว็บหลัก
│   ├── package.json
│   └── vite.config.js          # การตั้งค่า Vite + Tailwind
├── supabase/                   # การตั้งค่าและ Config ของ Supabase Local
│   └── config.toml
└── README.md
```

---

## 🚀 การเริ่มต้นใช้งาน (Getting Started)

### 1. ติดตั้ง Dependencies ในโฟลเดอร์ `client`
```bash
cd client
npm install
```

### 2. ตั้งค่า Supabase API Key
คัดลอกไฟล์ `.env.example` เป็น `.env` ในโฟลเดอร์ `client`:
```bash
cp .env.example .env
```
จากนั้นแก้ไขค่าใน `.env`:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. รันโปรเจกต์ (Development Mode)
```bash
npm run dev
```

---

## 🌿 กฎการทำงานกับ Git Branches

- ใช้ branches ของตัวเองในการพัฒนา
- เวลา commit ให้ Merge/Pull Request ขึ้น branch **`develop`** ก่อนเสมอ
