# Belajar Vibecoding - Bun API dengan ElysiaJS, Drizzle ORM, & MySQL

Proyek backend API modern yang menggunakan:
- [Bun](https://bun.sh)
- [ElysiaJS](https://elysiajs.com)
- [Drizzle ORM](https://orm.drizzle.team)
- MySQL (`mysql2`)

---

## Persiapan & Menjalankan Proyek

### 1. Salin Environment Variables
Salin file konfigurasi environment:
```bash
cp .env.example .env
```
Sesuaikan kredensial MySQL (`DATABASE_URL`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, dll.) di dalam `.env`.

### 2. Migrasi Database
Untuk menghasilkan skema migrasi SQL:
```bash
bun run db:generate
```
Untuk menerapkan skema langsung ke MySQL:
```bash
bun run db:push
```

### 3. Menjalankan Server Development
```bash
bun run dev
```
Server akan aktif di `http://localhost:3000`.

---

## Endpoint API

- `GET /` : Health check & status server
- `GET /users` : Mendapatkan daftar pengguna dari MySQL
- `POST /users` : Menambahkan pengguna baru (body JSON: `{ "name": "...", "email": "..." }`)
