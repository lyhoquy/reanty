# Reanty – Real Estate Landing Page

Bài test vị trí **HTML Trainee**: dựng landing page bất động sản theo thiết kế Figma, bằng HTML, CSS và JavaScript thuần (không framework).

## Link nộp bài

| Hạng mục | URL |
|---|---|
| Máy chủ thử nghiệm (website) | https://lyhoquy.github.io/`<repo-web>`/ |
| Data server | https://my-json-server.typicode.com/lyhoquy/`<repo-api>` |
| Source code website | https://github.com/lyhoquy/`<repo-web>` |
| Source data server | https://github.com/lyhoquy/`<repo-api>` |

### Các endpoint của data server

Tiền tố: `https://my-json-server.typicode.com/lyhoquy/<repo-api>`

| Endpoint | Method | Mô tả |
|---|---|---|
| `/site` | GET | Nội dung trang (menu, hero, dịch vụ, blog...) |
| `/featured` | GET | Căn hộ nổi bật (unit 9A) |
| `/stays` | GET | Danh sách 3 bất động sản |
| `/contact` | GET, POST | Form liên hệ |
| `/newsletter` | GET, POST | Đăng ký nhận bản tin |

> **Lưu ý:** My JSON Server chỉ trả phản hồi giả lập cho POST, dữ liệu gửi lên **không được lưu**. Các endpoint GET trả dữ liệu từ `db.json`.

## Công nghệ

- HTML5 (semantic)
- CSS3 (Flexbox, Grid, responsive)
- JavaScript thuần (`fetch`, async/await)
- My JSON Server làm data server
- GitHub Pages làm máy chủ thử nghiệm

## Cấu trúc thư mục

```text
reanty/
├── index.html
├── app.js
├── css/
│   └── style.css
├── assets/
│   ├── house-card.jpg
│   └── house-hero.jpg
├── data/                 # dữ liệu dự phòng (fallback)
│   ├── site.json
│   ├── stays.json
│   ├── contact.json
│   └── newsletter.json
└── README.md
```

Repo data server (`<repo-api>`) chỉ cần một file `db.json` ở thư mục gốc.

## Cách hoạt động của dữ liệu

1. Trang gọi `fetch()` tới data server để lấy nội dung và danh sách nhà.
2. Nếu data server lỗi hoặc không phản hồi, trang tự đọc file local trong `./data/*.json`.
3. Nếu cả hai đều lỗi, trang giữ nguyên nội dung HTML mặc định.
4. Form liên hệ và newsletter:
   - Kiểm tra dữ liệu bắt buộc và định dạng email ở phía client.
   - Gửi `POST` tới endpoint tương ứng.
   - Hiển thị thông báo cảm ơn.

Đường dẫn trong source code đều là **đường dẫn tương đối** (`./css/...`, `./assets/...`, `./data/...`).

## Chạy local

Không mở `index.html` trực tiếp (`file:///`), vì trình duyệt chặn `fetch()`. Hãy chạy qua server tĩnh:

```bash
python -m http.server 8000
```

Mở `http://localhost:8000`.

### Chạy data server local (tùy chọn)

```bash
npx json-server@0.17.4 --watch db.json --port 3000
```

Sau đó đổi `API_BASE` trong `app.js`:

```js
const API_BASE = 'http://localhost:3000';
```

Trước khi nộp, đổi lại thành:

```js
const API_BASE = 'https://my-json-server.typicode.com/lyhoquy/<repo-api>';
```

## Deploy

**Website (GitHub Pages)**
1. Push source lên repo `<repo-web>`.
2. Vào **Settings → Pages**, chọn nhánh `main`, thư mục `/ (root)`.
3. Mở link `https://lyhoquy.github.io/<repo-web>/`.

**Data server (My JSON Server)**
1. Tạo repo **public** `<repo-api>`.
2. Đặt `db.json` ở thư mục gốc.
3. Truy cập `https://my-json-server.typicode.com/lyhoquy/<repo-api>/stays` để kiểm tra.

## Tính năng

- Giao diện bám sát thiết kế Figma
- Responsive: desktop và mobile
- Nội dung trang và danh sách nhà nạp từ data server
- Form liên hệ và newsletter có validate
- Fallback dữ liệu local khi API lỗi

## Tác giả

- GitHub: https://github.com/lyhoquy
