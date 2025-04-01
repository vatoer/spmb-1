import InfoCardItem from "@/modules/pendaftaran/ui/components/formulir/info-card-item";

const info = [
  {
    title: "Data Diri",
    description:
      "Data diri calon murid baru terdiri atas nama, nik, nisn, tanggal lahir, jenis kelamin, alamat.",
  },
  {
    title: "Data Orang Tua",
    description:
      "Pastikan data sesuai dengan Kartu Keluarga dan dokumen resmi lainnya.",
  },
  {
    title: "Sekolah Asal",
    description:
      "Data sekolah asal calon murid baru terdiri atas NPSN, nama sekolah, alamat",
  },
  {
    title: "Data Rapor",
    description: "Data rapor 3 tahun terakhir.",
  },
  {
    title: "Sekolah Tujuan",
    description: "Sekolah tujuan calon murid baru.",
  },
];

const InfoCards = () => {
  return (
    <div className="flex flex-col md:grid-flow-row-dense justify-center items-center gap-4">
      {info.map((item, index) => (
        <InfoCardItem
          key={index}
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
  );
};

export default InfoCards;
