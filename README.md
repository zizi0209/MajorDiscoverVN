# MajorDiscover VN

Nền tảng hướng nghiệp & khám phá ngành học đại học cho học sinh Việt Nam.

## Tech Stack
- **Frontend**: Next.js 16 + Tailwind CSS v4
- **Backend**: Convex (realtime database + functions)

## Cài đặt & Chạy

### 1. Cài dependencies
```bash
npm install
```

### 2. Setup Convex
```bash
# Đăng nhập Convex (lần đầu)
npx convex login

# Khởi tạo project mới
npx convex dev
```
> Làm theo hướng dẫn: chọn "Create new project", đặt tên project.
> Convex sẽ tự tạo file `.env.local` với `NEXT_PUBLIC_CONVEX_URL`.

### 3. Seed dữ liệu mẫu (8 ngành học)
Sau khi `convex dev` đang chạy, mở terminal mới:
```bash
npx convex run seed:seed
```

### 4. Chạy dev server
```bash
npm run dev
```

Truy cập: http://localhost:3000

## Cấu trúc dự án
```
├── app/
│   ├── layout.tsx       # Root layout + Convex provider
│   └── page.tsx         # Trang chủ
├── components/
│   ├── Header.tsx       # Header navigation
│   ├── Hero.tsx         # Hero section
│   ├── MajorCard.tsx    # Card thông tin ngành học
│   ├── Quiz.tsx         # Khảo sát định hướng nghề nghiệp
│   └── ConvexClientProvider.tsx
├── convex/
│   ├── schema.ts        # Database schema
│   ├── majors.ts        # Queries/mutations cho ngành học
│   ├── quiz.ts          # Lưu kết quả khảo sát
│   └── seed.ts          # Dữ liệu mẫu 8 ngành
└── lib/
    └── utils.ts
```

## Tính năng
- 📚 **Danh sách ngành học**: 8 ngành phổ biến với pros/cons, khối thi, mã ngành
- 🏫 **Điểm chuẩn**: Dữ liệu 2024 và dự đoán 2025 của các trường từ Bắc vào Nam
- 🎯 **Khảo sát định hướng**: 3 bước (khối thi → sở thích → tính cách) → gợi ý ngành phù hợp
- ⚡ **Realtime**: Dữ liệu cập nhật live nhờ Convex
- 🔍 **Filter theo khối ngành**: Công nghệ, Kinh tế, Y - Dược, Kỹ thuật, Xã hội, Ngôn ngữ
