# FlowBoard - Agile Kanban & Sprint Planner 🚀

Alat produktivitas tim untuk mengelola workflow proyek secara visual. Dilengkapi gesture drag-and-drop yang intuitif, sorting kolom dinamis, filter kartu instan, dan penyimpanan status otomatis.

---

## ✨ Fitur Utama

- **Smooth Fluid Drag & Drop**: Reordering kartu tugas dan kolom kanban menggunakan HTML5 Drag & Drop dengan drop indicator menyala secara presisi.
- **Dynamic Column Sorting**: Kolom kanban dapat dipindahkan urutannya secara fleksibel (Backlog, In Progress, In Review, Done).
- **Tagging System & Priority Badges**:
  - `Urgent` (Merah membara)
  - `High` (Oranye)
  - `Medium` (Biru)
  - `Low` (Hijau)
- **Quick Card Editing (Inline Text Replacement)**: Klik teks judul atau deskripsi untuk mengedit langsung di tempat tanpa modal (`Enter` untuk simpan, `Escape` untuk batal).
- **Assigned Avatar**: Avatar tim dengan inisial dan warna dinamis beserta tooltip peran.
- **Search & Instant Filter**: Realtime filter berdasarkan kata kunci, badge prioritas, dan label tag.
- **Sprint Summary & Velocity**: Penghitungan otomatis story points, persentase penyelesaian sprint, dan status tugas aktif.
- **LocalStorage Auto-Save**: Status kartu, posisi kolom, dan perubahan tersimpan secara otomatis sehingga data tidak hilang saat browser di-refresh.
- **Reset Board**: Tombol reset untuk mengembalikan ke data awal sprint bawaan kapan saja.

---

## 🛠️ Arsitektur & Teknologi

- **React 18.3**: State management dengan pendekatan immutable update dan shallow diffing.
- **Tailwind CSS**: Layout flexbox & grid responsif dengan tema dark modern slate.
- **HTML5 Drag & Drop API**: Native event drag & drop dengan visual drop line indicators.
- **Lucide React**: Ikon modern dan konsisten.
- **Vite 5**: Build tool ultra cepat dengan Instant HMR.

---

## 🚀 Cara Menjalankan Proyek

Buka terminal di folder ini:
```bash
# Jalankan mode development
npm run dev
```

Aplikasi akan otomatis terbuka atau dapat diakses di:
👉 `http://localhost:3000`

Untuk build produksi:
```bash
npm run build
```

---

## ⌨️ Shortcut & Tips Penggunaan

- **Drag Kartu**: Klik dan tahan kartu, geser ke kolom atau posisi yang diinginkan. Garis biru akan menunjukkan posisi kartu disisipkan.
- **Drag Kolom**: Geser header kolom untuk mengubah urutan alur kanban.
- **Inline Edit Judul**: Klik teks judul kartu, ketik perubahan, tekan `Enter` atau klik di luar untuk menyimpan.
- **Inline Edit Deskripsi**: Klik deskripsi kartu, ketik (gunakan `Shift + Enter` untuk baris baru), tekan `Enter` untuk simpan.
- **Ubah Prioritas**: Klik langsung pada badge prioritas kartu untuk memilih prioritas baru via quick menu.
- **Tambah Cepat**: Gunakan tombol "+ Tambah Kartu" di bagian bawah masing-masing kolom, atau tombol "+ Tugas Baru" di header untuk form lengkap.
