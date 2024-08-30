# API Bookshelf

Proyek ini merupakan pekerjaan saya untuk modul "Belajar Membuat Aplikasi Back-End untuk Pemula" dari platform Dicoding. Ini mengimplementasikan API RESTful sederhana untuk mengelola rak buku menggunakan framework Hapi.js.

## Fitur

- Menambahkan buku baru
- Mendapatkan semua buku
- Mendapatkan buku spesifik berdasarkan ID
- Memperbarui informasi buku
- Menghapus buku
- Menghapus semua buku

## Struktur Proyek

```
.
├── src/
│   ├── books.js
│   ├── handler.js
│   ├── routes.js
│   ├── server.js
│   └── ...
├── eslint.config.mjs
├── package-lock.json
├── package.json
└── README.md
```

## Pengaturan dan Instalasi

1. Clone repositori ini
2. Instal dependensi:
   ```
   npm install
   ```
3. Jalankan server:
   ```
   node server.js
   ```

Server akan mulai berjalan di `http://localhost:9000`.

## Endpoint API

- `POST /books`: Menambahkan buku baru
- `GET /books`: Mendapatkan semua buku
- `GET /books/{bookId}`: Mendapatkan buku spesifik berdasarkan ID
- `PUT /books/{bookId}`: Memperbarui informasi buku
- `DELETE /books/{bookId}`: Menghapus buku spesifik
- `DELETE /books`: Menghapus semua buku

## Teknologi yang Digunakan

- Node.js
- Hapi.js
- ESLint

## Penulis

Habib Risky Kurniawan

