# Nguyên tắc Phát triển Giao diện (UI Guidelines)

Khi xây dựng hoặc chỉnh sửa giao diện trong dự án này, Agent phải TUYỆT ĐỐI tuân thủ các nguyên tắc thiết kế sau. Dự án này được thiết kế theo phong cách tối giản, phục vụ mục đích chia sẻ kiến thức pháp luật và hướng dẫn thủ tục hành chính.

## 1. Brand Kit - Bảng màu bắt buộc

TUYỆT ĐỐI KHÔNG tự ý sinh các mã màu HEX ngẫu nhiên. Chỉ được sử dụng các biến màu đã định nghĩa trong `src/app/globals.css` thông qua các class của Tailwind (ví dụ: `bg-primary`, `text-accent`):

- **`bg-main`** (`#F4F2F2`): Dùng cho nền web tổng thể và nền vùng đọc (ngoại trừ khi vùng đọc cụ thể cần màu trắng `#FFFFFF` cho sự tương phản).
- **`text-main`** (`#1D2128`): Dùng cho MỌI văn bản, tiêu đề, và nền Footer.
- **`primary`** (`#215E61`): Dùng cho Header, Sidebar, các đường viền khối Quote Block hoặc các thành phần chính mang tính chất branding.
- **`accent`** (`#FF9E20`): Dùng cho các nút bấm Call-to-action (CTA), highlight mục lục (TOC) đang đọc, thẻ lưu ý.

Màu trạng thái tiêu chuẩn tài liệu pháp lý:
- **`danger`** (`#DC2626`): Dùng để nhấn mạnh các hành vi vi phạm, mức phạt, rủi ro pháp lý.
- **`success`** (`#15803D`): Dùng để chỉ hồ sơ hợp lệ, điều kiện đúng, các bước thành công.



## 3. Typography & Icons

- **Font chữ**: Sử dụng bộ font chữ tối giản (Geist/Inter).
- **Icons**: Sử dụng thư viện `lucide-react` cho toàn bộ dự án. Các icon cần có màu sắc phù hợp với ngữ cảnh (VD: icon cảnh báo dùng màu `danger`, icon thông tin dùng màu `primary` hoặc `accent`).

## 4. Mobile-first & Responsive Design

- Dự án nhắm đến đối tượng người dùng chủ yếu qua điện thoại (mobile).
- Mọi thành phần giao diện, layout, bảng biểu, ảnh đều phải tuân thủ nguyên tắc Mobile-first.
- Đảm bảo Sidebar có thể ẩn/hiện hợp lý trên mobile, nội dung đọc không bị tràn viền và cỡ chữ đủ lớn, dễ đọc trên màn hình nhỏ.

## 5. Quy trình Kiểm tra Code (Pre-push Check)

- **TUYỆT ĐỐI BẮT BUỘC:** Trước khi commit và push code lên GitHub (hoặc nhánh chính), Agent **phải** chạy lệnh `npm run build` và `npm run lint` để kiểm tra toàn bộ lỗi TypeScript, Next.js build errors.
- Chỉ đẩy code (push) khi lệnh build và lint thành công hoàn toàn (0 lỗi). Không bao giờ đẩy code đang bị lỗi Type Check lên Production.
