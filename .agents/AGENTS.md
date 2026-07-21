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

## 2. Layout (Documentation Layout)

Dự án sử dụng cấu trúc **3 cột** làm tiêu chuẩn (đã được định nghĩa trong `src/components/layout/DocLayout.tsx`):
- **Cột Trái (Sidebar)**: Thanh điều hướng danh mục bài viết, thủ tục hành chính. Nền màu `primary`.
- **Cột Giữa (Main Content)**: Vùng hiển thị nội dung chính.
- **Cột Phải (Table of Contents - TOC)**: Hiển thị mục lục bài viết, các headings.

Khi thêm mới một trang (`page.tsx`), không cần định nghĩa lại layout này vì nó đã được bọc trong `app/layout.tsx`. Chỉ tập trung thiết kế phần Nội dung chính (Main Content).

## 3. Typography & Icons

- **Font chữ**: Sử dụng bộ font chữ tối giản (Geist/Inter).
- **Icons**: Sử dụng thư viện `lucide-react` cho toàn bộ dự án. Các icon cần có màu sắc phù hợp với ngữ cảnh (VD: icon cảnh báo dùng màu `danger`, icon thông tin dùng màu `primary` hoặc `accent`).

## 4. Mobile-first & Responsive Design

- Dự án nhắm đến đối tượng người dùng chủ yếu qua điện thoại (mobile).
- Mọi thành phần giao diện, layout, bảng biểu, ảnh đều phải tuân thủ nguyên tắc Mobile-first.
- Đảm bảo Sidebar có thể ẩn/hiện hợp lý trên mobile, nội dung đọc không bị tràn viền và cỡ chữ đủ lớn, dễ đọc trên màn hình nhỏ.

## 5. Quy trình Kiểm tra Code (Pre-push Check)

- **TUYỆT ĐỐI BẮT BUỘC:** Trước khi commit và push code lên GitHub (hoặc nhánh chính), Agent **phải** chạy lệnh `npm run build` để kiểm tra toàn bộ lỗi TypeScript, Next.js build errors.
- Chỉ đẩy code (push) khi lệnh build thành công hoàn toàn (0 lỗi). Không bao giờ đẩy code đang bị lỗi Type Check lên Production.

## 6. Quy định Commit & Push Git

- **DUY NHẤT 1 COMMIT:** Mỗi yêu cầu hoặc tác vụ hoàn chỉnh của người dùng chỉ được tạo **duy nhất 01 commit** đại diện cho toàn bộ thay đổi.
- **KHÔNG TẠO COMMIT TRÙNG LẶP:** Luôn sử dụng `git status` kiểm tra kỹ lưỡng trước khi gộp toàn bộ thay đổi vào 1 commit duy nhất (`git add .` và `git commit`). Tuyệt đối không tạo các commit lặt vặt, dư thừa hoặc trùng lặp trong cùng một lần xử lý yêu cầu.

