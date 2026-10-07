# Reanty — Real Estate Landing Page

Dự án Landing Page bất động sản Reanty tuân thủ 100% các yêu cầu kỹ thuật nộp bài.

---

## 1. Thông Tin Máy Chủ Thử Nghiệm & Data Server

Khi khởi chạy qua `python server.py`:

- **URL máy chủ thử nghiệm (Website)**: [http://localhost:8000/](http://localhost:8000/)
- **URL Data Server (Stays & Properties)**: [http://localhost:8000/data/stays.json](http://localhost:8000/data/stays.json)
- **URL Data Server (Site Config & Content)**: [http://localhost:8000/data/site.json](http://localhost:8000/data/site.json)
- **URL Data Server (Contact Endpoint)**: [http://localhost:8000/data/contact.json](http://localhost:8000/data/contact.json)
- **URL Data Server (Newsletter Endpoint)**: [http://localhost:8000/data/newsletter.json](http://localhost:8000/data/newsletter.json)

---

## 2. Kiểm Tra Tiêu Chí Nộp Bài (Checklist)

| # | Tiêu chí yêu cầu | Trạng thái | Chi tiết triển khai |
|---|---|---|---|
| 1 | **Code thuần HTML và CSS, không dùng framework** | ✅ Đạt 100% | Chỉ sử dụng HTML5 semantic và Vanilla CSS3. Hoàn toàn không dùng React, Vue, Tailwind, Bootstrap hay bất kỳ thư viện hỗ trợ nào. |
| 2 | **Đính kèm link URL máy chủ thử nghiệm & data server** | ✅ Đạt 100% | Website tại `http://localhost:8000/`, Data server tại `http://localhost:8000/data/stays.json`. |
| 3 | **Web responsive (trên cả PC và SP)** | ✅ Đạt 100% | Đã thiết kế responsive đầy đủ từ Desktop lớn (> 1250px), Laptop (1000px – 1250px), Tablet (768px – 1000px) đến Smartphone (SP) (< 768px và < 360px). |
| 4 | **Sử dụng đường dẫn tương đối trong source code** | ✅ Đạt 100% | Tất cả tài nguyên dùng đường dẫn tương đối: `./styles.css`, `./assets/`, `./fonts/`, `./data/`, `./app.js`. Không dùng đường dẫn tuyệt đối hay link ngoài. |
| 5 | **Code gọn gàng, ít bug** | ✅ Đạt 100% | Cấu trúc semantic, phân chia module rõ ràng, không lỗi console, font chữ local không phụ thuộc mạng ngoài. |
| 6 | **Dữ liệu tách riêng vào thư mục `data/`, không hardcode** | ✅ Đạt 100% | Toàn bộ dữ liệu nằm trong `data/`: `contact.json`, `newsletter.json`, `site.json`, `stays.json`. Script `app.js` (Vanilla JS) nạp dữ liệu động từ JSON và hỗ trợ lọc danh mục. |

---

## 3. Cấu Trúc Thư Mục

```
reanty/
├── index.html        # Trang giao diện chính (HTML5 semantic)
├── styles.css        # CSS thuần, biến custom, chuẩn responsive PC & SP
├── app.js            # Vanilla JS nạp data động từ JSON (không framework)
├── server.py         # HTTP Server chuẩn Python phục vụ web & data endpoints
├── data/             # Thư mục dữ liệu độc lập
│   ├── stays.json        # Dữ liệu danh sách bất động sản, căn hộ mẫu
│   ├── site.json         # Cấu hình website, thông tin thương hiệu, dịch vụ, blog
│   ├── contact.json      # Endpoint và cấu trúc dữ liệu liên hệ
│   └── newsletter.json   # Endpoint đăng ký nhận bản tin
├── assets/           # Ảnh và biểu tượng SVG
└── fonts/            # Bộ font local (Nunito, Poppins, Inter, Social)
```

---

## 4. Hướng Dẫn Khởi Chạy

```bash
# Trong thư mục dự án
python server.py
```

Mở trình duyệt truy cập:
- Giao diện: `http://localhost:8000/`
- Data stays: `http://localhost:8000/data/stays.json`
