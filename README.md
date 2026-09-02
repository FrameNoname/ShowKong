#อ่านกันด้วยบางย่างไม่ได้อัพเดทถ้ามีอะไรสงสัยเข้าดิสมาคุย
##อย่า merge mainเองเด็ดขาด!!! commit เข้าbranch ของตัวเองก่อน pull requests มา develop ถ้า merge แล้วติดconfig ต้องคุยกันก่อนห้ามทำตามใจ
#ถ้า pull requests ต้องเขียนใน description ว่าทำอะไรไปไม่งั้นจะไม่รู้ว่าทำถึงไหนแล้ว

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
├── frontend/                   # โค้ดฝั่ง Frontend (HTML / JS / Tailwind)
│   ├── src/
│   │   ├── lib/
│   │   │   └── supabase.js     # เชื่อมต่อ Supabase Client
│   │   ├── main.js             # Entry Point JavaScript
│   │   └── style.css           # Tailwind CSS styles
│   ├── .env.example            # ตัวอย่างการตั้งค่า Environment Variables
│   ├── index.html              # หน้าเว็บหลัก
│   ├── package.json
│   └── vite.config.js          # การตั้งค่า Vite + Tailwind
├── backend/                    # การตั้งค่าและ Config ของ Supabase Local
│   └── config.toml
├── package.json                # สคริปต์รันโปรเจกต์หลัก
└── README.md
```

---

## 🚀 การเริ่มต้นใช้งาน (Getting Started)

### 1. ติดตั้ง Dependencies
```bash
cd frontend
npm install
```

### 2. ตั้งค่า Supabase API Key
คัดลอกไฟล์ `.env.example` เป็น `.env` ในโฟลเดอร์ `frontend`:
```bash
# ในโฟลเดอร์ frontend
cp .env.example .env
```
จากนั้นแก้ไขค่าใน `frontend/.env`:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. รันโปรเจกต์ (Development Mode)
สามารถรันได้ 2 วิธี:

**วิธีที่ 1: รันจากโฟลเดอร์ Root (`ShowKong/`) โดยตรง**
```bash
npm run dev
```

**วิธีที่ 2: รันจากโฟลเดอร์ `frontend/`**
```bash
cd frontend
npm run dev
```

---

## 🌿 กฎการทำงานกับ Git Branches

- ใช้ branches ของตัวเองในการพัฒนา
- เวลา commit ให้ Merge/Pull Request ขึ้น branch **`develop`** ก่อนเสมอ
