import { getWilayahAdministratif } from "@/data/wilayah-administratif";

export const getOptionsWilayahAdministratif = async (
  indukId: string | null
) => {
  const wilayahAdministratif = await getWilayahAdministratif(indukId);
  return wilayahAdministratif.map((wilayah) => ({
    value: wilayah.id,
    label: wilayah.nama,
  }));
};
