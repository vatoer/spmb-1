export interface JalurPendaftaran {
  title: string;
  url: string;
  description: string;
}

export const JALUR_PENDAFTARAN: JalurPendaftaran[] = [
  {
    title: "Domisili",
    url: "/panduan/jalur-pendaftaran/domisili",
    description: "Jalur pendaftaran sesuai domisili",
  },
  {
    title: "Afirmasi",
    url: "/panduan/jalur-pendaftaran/afirmasi",
    description: "Jalur pendaftaran afirmasi",
  },
  {
    title: "Perpindahan Orang Tua",
    url: "/panduan/jalur-pendaftaran/perpindahan-orang-tua",
    description: "Jalur pendaftaran perpindahan orang tua",
  },
  {
    title: "Prestasi",
    url: "/panduan/jalur-pendaftaran/prestasi",
    description: "Jalur pendaftaran prestasi",
  },
];
