export default async function FormulirDataDiriPage({
  params,
}: {
  params: Promise<{ pendaftaranId: string }>;
}) {
  // Mengambil ID pendaftaran dari parameter
  const { pendaftaranId } = await params;
  return (
    <div>
      <h1>Formulir Data Diri {pendaftaranId}</h1>
      {/* Formulir untuk mengisi data diri */}
      {/* <FormulirDataDiri pendaftaran={pendaftaran} /> */}
    </div>
  );
}
