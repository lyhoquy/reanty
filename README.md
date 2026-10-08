# Reanty — Real Estate Agency

## Demo

YOUR_DEPLOYED_URL

## Data Server

https://www.myjsons.com/v/48e95347

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript

---

## 1. Project Structure

```text
reanty/
├── index.html        # Trang giao diện chính (HTML5 semantic)
├── css/
│   └── style.css     # CSS thuần, biến custom, chuẩn responsive Desktop & Mobile
├── js/
│   └── main.js       # Vanilla JS nạp và render động từ Data Server (có local fallback)
├── data/
│   ├── db.json       # Bản sao dữ liệu đầy đủ phục vụ local fallback
│   ├── stays.json    # Dữ liệu danh sách bất động sản
│   ├── site.json     # Cấu hình website, thông tin thương hiệu, dịch vụ, blog
│   ├── contact.json  # Mock endpoint liên hệ
│   └── newsletter.json # Mock endpoint nhận bản tin
├── assets/
│   ├── images/
│   │   ├── hero/
│   │   ├── properties/  # Chứa house-card.jpg, house-hero.jpg
│   │   ├── sections/
│   │   └── blog/
│   └── icons/
└── fonts/            # Bộ font local (Nunito, Poppins, Inter, Social)
```

---

## 2. Data Server Architecture & Fallback

Dữ liệu được nạp tự động qua hàm `fetchData()`:

1. **Primary**: Gọi trực tiếp tới Data Server `https://www.myjsons.com/v/48e95347`.
2. **Local Fallback**: Nếu mất mạng hoặc server myJSONS tạm thời gián đoạn, ứng dụng tự động fallback nạp từ `./data/db.json` qua relative path, đảm bảo trang luôn hiển thị đầy đủ và không bị lỗi console.

---
