export interface Tahapan {
  stage: number;
  title: string;
  url: string;
  description: string;
  disableOnAuth?: boolean;
}

export const tahapan: Tahapan[] = [
  {
    stage: 1,
    title: "Membuat Akun",
    url: "/buat-akun-baru",
    disableOnAuth: true,
    description:
      "Isi formulir pembuatan akun dengan nama dan email anda. Anda juga bisa login menggunakan akun google anda. Anda akan mendapatkan email verifikasi untuk mengaktifkan akun anda",
  },
  {
    stage: 2,
    title: "Isi Formulir",
    url: "/formulir",
    description:
      "Isi Formulir data diri Calon Murid Baru, data Orang Tua dan unggah dokumen yang diperlukan.",
  },
  {
    stage: 3,
    title: "Pilih Sekolah",
    url: "/sekolah",
    description:
      "Pilih Sekolah tujuan anda dan ajukan pendaftaran. Anda mungkin diminta untuk melengkapi dokumen yang diperlukan.",
  },
  {
    stage: 4,
    title: "Pembayaran",
    url: "/pembayaran",
    description:
      "Pembayaran Biaya registrasi melalui transfer bank atau Indomaret terdekat. cetak bukti pembayaran.",
  },
  {
    stage: 5,
    title: "Verifikasi & Seleksi",
    url: "/pendaftaran",
    description:
      "Proses Verifikasi dan Seleksi untuk setiap sekolah bervariasi tergantung keperluan sekolah. Anda akan mendapatkan informasi lebih lengkap saat anda memilih sekolah.",
  },
  {
    stage: 6,
    title: "Lapor diri",
    url: "/lapor-diri",
    description:
      "Pastikan Anda telah membaca dengan seksama informasi dan ketentuan yang diberikan oleh sekolah tujuan Anda dan melakukan laporan diri",
  },
];
