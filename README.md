# 🛒 Sistem Kasir (Point of Sale)

Aplikasi sistem kasir (Point of Sale) berbasis web yang dibangun menggunakan **React** dan **Supabase**. Aplikasi ini dirancang untuk membantu proses transaksi penjualan mulai dari menampilkan katalog produk, mengelola keranjang belanja, memproses pembayaran, hingga mencetak struk pembelian.

---

## 📋 Daftar Isi

- [Fitur Utama](#-fitur-utama)
- [Tech Stack](#-tech-stack)
- [Struktur Database](#-struktur-database)
- [Struktur Folder](#-struktur-folder)
- [Prasyarat](#-prasyarat)
- [Instalasi](#-instalasi)
- [Menjalankan Aplikasi](#-menjalankan-aplikasi)
- [Cara Penggunaan](#-cara-penggunaan)

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
| --- | --- |
| **Katalog Produk** | Menampilkan daftar produk lengkap dengan gambar, harga, dan stok |
| **Pencarian Produk** | Mencari produk berdasarkan nama |
| **Filter Kategori** | Memfilter produk berdasarkan kategori (Makanan, Minuman, Ice Cream, Pastry) |
| **Keranjang Belanja** | Menambah produk ke keranjang dengan kontrol jumlah (tambah/kurang) |
| **Perhitungan Otomatis** | Menghitung subtotal, PPN 11%, dan total secara otomatis |
| **Metode Pembayaran** | Mendukung pembayaran Cash dan QRIS |
| **Perhitungan Kembalian** | Menghitung kembalian secara otomatis untuk pembayaran cash |
| **Struk Pembelian** | Menampilkan struk digital setelah transaksi berhasil |
| **Tambah Produk** | Form untuk menambahkan produk baru beserta upload gambar |
| **Responsive** | Mendukung tampilan desktop dan mobile |
| **Sidebar Navigasi** | Navigasi sidebar untuk berpindah antar halaman |

---

## 🛠 Tech Stack

| Teknologi | Keterangan |
| --- | --- |
| **React 19** | Library frontend untuk membangun UI |
| **Vite** | Build tool dan dev server |
| **Supabase** | Backend-as-a-Service (database PostgreSQL, storage, & API) |
| **Tailwind CSS 4** | Utility-first CSS framework |
| **shadcn/ui** | Komponen UI yang accessible dan customizable |
| **React Router 7** | Routing dan navigasi halaman |
| **Lucide React** | Ikon-ikon modern untuk UI |
| **React Hot Toast** | Notifikasi toast |
| **Inter Font** | Tipografi modern |

---

## 🗄 Struktur Database

Aplikasi ini menggunakan **Supabase (PostgreSQL)** dengan struktur tabel sebagai berikut:

### Tabel `category`

| Kolom | Tipe | Keterangan |
| --- | --- | --- |
| `id` | int (PK) | ID kategori |
| `category_name` | text | Nama kategori |

### Tabel `product`

| Kolom | Tipe | Keterangan |
| --- | --- | --- |
| `id` | int (PK) | ID produk |
| `name` | text | Nama produk |
| `price` | int | Harga produk |
| `stock` | int | Stok produk |
| `image_url` | text | URL gambar produk |
| `category_id` | int (FK) | Referensi ke tabel `category` |

### Tabel `transactions`

| Kolom | Tipe | Keterangan |
| --- | --- | --- |
| `id` | int (PK) | ID transaksi |
| `invoice_number` | text | Nomor invoice (format: `INV-{timestamp}`) |
| `subtotal` | int | Subtotal sebelum pajak |
| `tax` | int | Pajak PPN 11% |
| `total` | int | Total setelah pajak |
| `payment_method` | text | Metode pembayaran (`cash` / `qris`) |
| `cash_paid` | int | Jumlah uang yang dibayarkan |
| `change_amount` | int | Jumlah kembalian |

### Tabel `transaction_items`

| Kolom | Tipe | Keterangan |
| --- | --- | --- |
| `id` | int (PK) | ID item transaksi |
| `transaction_id` | int (FK) | Referensi ke tabel `transactions` |
| `product_id` | int (FK) | Referensi ke tabel `product` |
| `qty` | int | Jumlah item |
| `price` | int | Harga satuan |
| `subtotal` | int | Subtotal per item |

### Supabase Storage

- **Bucket:** `image_product` — menyimpan gambar produk yang diupload

---

## 📁 Struktur Folder

```
sistem-kasir/
├── public/                  # Aset statis
├── src/
│   ├── api/                 # Fungsi API untuk komunikasi dengan Supabase
│   │   ├── produk.js        # CRUD & pencarian produk
│   │   └── transactions.js  # CRUD transaksi & invoice
│   ├── assets/              # Aset gambar/media
│   ├── components/          # Komponen React
│   │   ├── ui/              # Komponen UI dari shadcn/ui
│   │   ├── app-sidebar.jsx  # Navigasi sidebar
│   │   ├── CardProduct.jsx  # Kartu produk di katalog
│   │   ├── PaymentModal.jsx # Modal pembayaran
│   │   ├── ProductList.jsx  # Item produk di keranjang
│   │   └── ReceiptCard.jsx  # Pop-up struk pembelian
│   ├── context/             # React Context untuk state management
│   │   ├── TransactionContext.jsx  # State keranjang & perhitungan
│   │   └── InvoiceContext.jsx      # State data invoice/struk
│   ├── hooks/               # Custom hooks
│   │   ├── useInvoice.js    # Hook untuk akses InvoiceContext
│   │   ├── usePayment.js    # Hook logika pembayaran
│   │   ├── useProducts.js   # Hook fetch & pencarian produk
│   │   ├── useTransaction.js # Hook untuk akses TransactionContext
│   │   └── use-mobile.js    # Hook deteksi perangkat mobile
│   ├── layout/              # Halaman-halaman utama
│   │   ├── Layout.jsx       # Layout utama dengan sidebar
│   │   ├── Transaction.jsx  # Halaman transaksi (utama)
│   │   ├── Checkout.jsx     # Halaman checkout (mobile)
│   │   └── ProductAdd.jsx   # Halaman tambah produk
│   ├── lib/                 # Utilitas
│   │   └── utils.js         # Helper functions (cn)
│   ├── supabase/            # Konfigurasi Supabase
│   │   └── supabase.js      # Inisialisasi Supabase client
│   ├── index.css            # Styling global
│   └── main.jsx             # Entry point & routing
├── .env                     # Environment variables (tidak di-commit)
├── .gitignore
├── index.html               # HTML entry point
├── package.json
├── vite.config.js
└── README.md
```

---

## 📌 Prasyarat

Pastikan sudah terinstall di komputer:

- **Node.js** versi 18 atau lebih baru — [Download Node.js](https://nodejs.org/)
- **npm** (sudah termasuk saat install Node.js)
- **Git** — [Download Git](https://git-scm.com/)
- Akun **Supabase** — [supabase.com](https://supabase.com/)

---

## 🚀 Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/MuhamadNurRizkii/sistem-kasir.git
cd sistem-kasir
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Konfigurasi Environment Variables

Buat file `.env` di root project dan isi dengan kredensial Supabase kamu:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

> **Catatan:** Kamu bisa mendapatkan nilai-nilai ini dari **Supabase Dashboard → Settings → API**.

### 4. Setup Database Supabase

Buat tabel-tabel berikut di Supabase Dashboard (SQL Editor):

```sql
-- Tabel Kategori
CREATE TABLE category (
  id SERIAL PRIMARY KEY,
  category_name TEXT NOT NULL
);

-- Insert data kategori
INSERT INTO category (category_name) VALUES
  ('makanan'),
  ('minuman'),
  ('ice cream'),
  ('pastry');

-- Tabel Produk
CREATE TABLE product (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  image_url TEXT,
  category_id INTEGER REFERENCES category(id)
);

-- Tabel Transaksi
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  invoice_number TEXT NOT NULL,
  subtotal INTEGER NOT NULL,
  tax INTEGER NOT NULL,
  total INTEGER NOT NULL,
  payment_method TEXT NOT NULL,
  cash_paid INTEGER NOT NULL,
  change_amount INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabel Item Transaksi
CREATE TABLE transaction_items (
  id SERIAL PRIMARY KEY,
  transaction_id INTEGER REFERENCES transactions(id),
  product_id INTEGER REFERENCES product(id),
  qty INTEGER NOT NULL,
  price INTEGER NOT NULL,
  subtotal INTEGER NOT NULL
);
```

### 5. Setup Storage Supabase

1. Buka **Supabase Dashboard → Storage**
2. Buat bucket baru dengan nama: `image_product`
3. Set bucket sebagai **Public** agar gambar produk bisa diakses

---

## ▶ Menjalankan Aplikasi

### Mode Development

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173` (default Vite).

### Build Production

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

---

## 📖 Cara Penggunaan

### 1. Menambah Produk Baru

1. Klik menu **"Tambah Produk"** di sidebar kiri
2. Isi form yang tersedia:
   - **Nama Produk** — nama produk yang akan dijual
   - **Harga** — harga satuan produk
   - **Stok** — jumlah stok produk
   - **Kategori** — pilih salah satu: Makanan, Minuman, Ice Cream, atau Pastry
   - **Upload Gambar** — pilih gambar produk (format: JPG, PNG, JPEG)
3. Klik tombol **"Tambah"**
4. Jika berhasil, akan muncul notifikasi dan otomatis kembali ke halaman transaksi

### 2. Melakukan Transaksi

1. Klik menu **"Transaksi"** di sidebar untuk ke halaman utama
2. Di bagian **Daftar Produk** (sisi kiri):
   - Lihat katalog produk yang tersedia
   - Gunakan **kolom pencarian** untuk mencari produk berdasarkan nama
   - Klik **badge kategori** (Semua, Makanan, Minuman, dll.) untuk memfilter produk
3. Klik tombol **"Tambah"** pada kartu produk untuk menambahkan ke keranjang
4. Di bagian **Pesanan Saat Ini** (sisi kanan):
   - Lihat daftar produk yang sudah ditambahkan ke keranjang
   - Gunakan tombol **"+"** dan **"−"** untuk mengatur jumlah produk
   - Subtotal, PPN 11%, dan Total akan dihitung otomatis
5. Klik tombol **"Lanjut Pembayaran"** untuk membuka modal pembayaran

> **Catatan:** Pada tampilan mobile, klik ikon 🛒 atau tombol **"Checkout"** di bawah untuk melihat keranjang di halaman terpisah.

### 3. Proses Pembayaran

1. Pada modal pembayaran, review ringkasan pesanan:
   - Subtotal
   - PPN 11%
   - Total
2. Pilih **metode pembayaran**:
   - **Cash** — masukkan jumlah uang yang dibayarkan, kembalian dihitung otomatis
   - **QRIS** — jumlah pembayaran otomatis terisi sesuai total
3. Klik tombol **"Bayar Sekarang"**
4. Jika pembayaran berhasil:
   - Stok produk otomatis berkurang
   - Keranjang otomatis dikosongkan
   - Struk pembelian akan muncul

### 4. Struk Pembelian

Setelah transaksi berhasil, pop-up struk akan menampilkan:

- **Nomor Invoice** — nomor unik transaksi
- **Metode Pembayaran** — Cash atau QRIS
- **Daftar Produk** — nama, qty, harga satuan, dan subtotal per produk
- **Subtotal** — total sebelum pajak
- **Pajak** — PPN 11%
- **Total** — total setelah pajak
- **Dibayar** — jumlah uang yang dibayarkan
- **Kembalian** — selisih antara uang bayar dan total

Klik tombol **"Cetak Struk"** untuk mencetak, atau klik **✕** untuk menutup.

---

## 📄 Lisensi

Project ini dibuat untuk keperluan pembelajaran.
