interface Faq {
  pertanyaan: string;
  jawaban: string;
  url?: string;
  linkText?: string;
}

export const FAQ: Faq[] = [
  {
    pertanyaan: "Apa itu SPMB?",
    jawaban:
      "SPMB adalah singkatan dari Sistem Penerimaan Murid Baru, yang merupakan program penerimaan murid baru yang dilakukan oleh sekolah-sekolah di Indonesia.",
  },
  {
    pertanyaan: "Bagaimana cara mendaftar di SPMB?",
    jawaban:
      "Untuk mendaftar di SPMB, Anda dapat mengikuti beberapa tahapan yang telah disediakan oleh sekolah yang Anda tuju. Tahapan tersebut antara lain membuat akun, mengisi formulir pendaftaran, memilih sekolah, melakukan pembayaran, verifikasi dan seleksi, serta lapor diri.",
    url: "/buat-akun-baru",
    linkText: "Buat Akun Sekarang",
  },
  {
    pertanyaan: "Apakah saya dapat mendaftar di lebih dari satu sekolah?",
    jawaban:
      "Ya, Anda dapat mendaftar di lebih dari satu sekolah. Namun, pastikan Anda memenuhi syarat dan ketentuan yang diperlukan oleh masing-masing sekolah.",
  },
  {
    pertanyaan: "Apakah ada biaya pendaftaran?",
    jawaban:
      "Setiap sekolah memiliki kebijakan biaya pendaftaran yang berbeda-beda. Anda dapat melihat informasi biaya pendaftaran di masing-masing sekolah yang Anda tuju.",
    url: "/sekolah",
    linkText: "Lihat Daftar Sekolah",
  },
  {
    pertanyaan: "Bagaimana cara melihat hasil verifikasi?",
    jawaban:
      "Anda dapat melihat hasil verifikasi di halaman Riwayat Pendaftaran",
    url: "/riwayat-pendaftaran",
    linkText: "Lihat Riwayat Pendaftaran",
  },
  {
    pertanyaan: "Bagaimana cara melihat hasil seleksi?",
    jawaban:
      "Anda dapat melihat hasil seleksi di halaman Riwayat Pendaftaran atau di halaman Seleksi.",
    url: "/riwayat-pendaftaran",
    linkText: "Lihat Riwayat Pendaftaran",
  },
  {
    pertanyaan:
      "Dokumen apa saja yang harus saya siapkan untuk mendaftar di SPMB?",
    jawaban:
      "Dokumen yang harus Anda siapkan untuk mendaftar di SPMB antara lain akta kelahiran, kartu keluarga, ijazah terakhir, pas foto, KTP orang tua, Surat Tanggung Jawab Mutlak atau Pakta Integritas Orang Tua dan dokumen lainnya yang sesuai dengan kebutuhan sekolah yang Anda tuju.",
    url: "/template-dokumen",
    linkText: "Unduh Template Dokumen",
  },
];
