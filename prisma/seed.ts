import { dbSpmb } from "@/lib/db-spmb";
import csv from "csv-parser";
import fs from "fs";

interface Pendapatan {
  id: string;
  nama: string;
}

const truncateBeforeSeed = async (): Promise<void> => {
  console.log("Deleting existing data...");

  await dbSpmb.$executeRawUnsafe(
    `TRUNCATE TABLE "pekerjaan" RESTART IDENTITY CASCADE`
  );
  await dbSpmb.$executeRawUnsafe(
    `TRUNCATE TABLE "rentang_pendapatan" RESTART IDENTITY CASCADE`
  );
  await dbSpmb.$executeRawUnsafe(
    `TRUNCATE TABLE "dapo_wilayah" RESTART IDENTITY CASCADE`
  );
  await dbSpmb.$executeRawUnsafe(
    `TRUNCATE TABLE "wilayah_administratif" RESTART IDENTITY CASCADE`
  );
  await dbSpmb.$executeRawUnsafe(
    `TRUNCATE TABLE "sekolah" RESTART IDENTITY CASCADE`
  );
  await dbSpmb.$executeRawUnsafe(
    `TRUNCATE TABLE "mata_pelajaran" RESTART IDENTITY CASCADE`
  );

  console.log("Existing data deleted successfully");
};

// as columns in csv
interface Sekolah {
  id: string;
  nama: string;
  npsn: string;
  status: string;
  bentuk_pendidikan: string;
  alamat: string;
  map_coordinates: string;
  kode_pos: string;
  dapo_wilayah_id: string;
  kelurahan_desa: string;
  telp: string;
  email: string;
  website: string;
  akreditasi: string;
  kurikulum: string;
  visi: string;
  misi: string;
  fasilitas: string;
  logo: string;
  beranda_html: string;
  beranda_banner: string;
  beranda_plaintext: string;
}

const seedSekolah = async (): Promise<void> => {
  const csvPath = "prisma/db-spmb/csv-seed/sekolah.csv";
  const results: Sekolah[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(csvPath)
      .pipe(csv({ separator: ";" }))
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        try {
          const chunkSize = 10000;
          for (let i = 0; i < results.length; i += chunkSize) {
            const chunk = results.slice(i, i + chunkSize).map((row) => ({
              id: row.id,
              nama: row.nama,
              npsn: row.npsn,
              status: row.status,
              bentukPendidikan: row.bentuk_pendidikan,
              alamat: row.alamat,
              mapCoordinates: row.map_coordinates,
              kodePos: row.kode_pos,
              dapoWilayahId: row.dapo_wilayah_id,
              kelurahanDesa: row.kelurahan_desa,
              telp: row.telp,
              email: row.email,
              website: row.website,
              akreditasi: row.akreditasi,
              kurikulum: row.kurikulum,
              visi: row.visi,
              misi: row.misi,
              fasilitas: row.fasilitas ? row.fasilitas.split(",") : undefined,
              logo: row.logo,
              berandaHtml: row.beranda_html,
              berandaBanner: row.beranda_banner,
              berandaPlaintext: row.beranda_plaintext,
            }));

            console.log(`Inserting sekolah data: ${i} - ${i + chunk.length}`);

            await dbSpmb.sekolah.createMany({
              data: chunk,
              skipDuplicates: true, // optional, prevents insert error on duplicate `id`
            });
          }

          console.log("Data Sekolah seeded successfully");
          resolve();
        } catch (error) {
          reject(error);
        }
      })
      .on("error", (error) => reject(error));
  });
};

interface MataPelajaran {
  id: string;
  nama: string;
  kode: string;
  jenjang_dikdasmen: string;
}

const seedMataPelajaran = async (): Promise<void> => {
  const csvPath = "prisma/db-spmb/csv-seed/mata_pelajaran.csv";
  const results: MataPelajaran[] = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(csvPath)
      .pipe(csv({ separator: ";" }))
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        try {
          for (const row of results) {
            console.log("seeding mata pelajaran", row);
            await dbSpmb.mataPelajaran.create({
              data: {
                id: row.id,
                nama: row.nama,
                kode: row.kode,
                jenjangDikdasmen: row.jenjang_dikdasmen,
              },
            });
          }
          console.log("Data Mata Pelajaran seeded successfully");
          resolve();
        } catch (error) {
          reject(error);
        }
      })
      .on("error", (error) => reject(error));
  });
};

interface WilayahAdministratif {
  id: string;
  nama: string;
  indukId: string;
  tingkat: string;
}

const seedWilayahAdministratif = async (): Promise<void> => {
  const csvPath = "prisma/db-spmb/csv-seed/wilayah_administratif.csv";
  const results: WilayahAdministratif[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(csvPath)
      .pipe(csv({ separator: ";" }))
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        try {
          const chunkSize = 10000;

          for (let i = 0; i < results.length; i += chunkSize) {
            const chunk = results.slice(i, i + chunkSize).map((row) => ({
              id: row.id,
              nama: row.nama,
              indukId: row.indukId === "" ? null : row.indukId,
              tingkat: Number(row.tingkat),
            }));

            console.log(
              `Inserting wilayah administratif data: ${i} - ${i + chunk.length}`
            );

            await dbSpmb.wilayahAdministratif.createMany({
              data: chunk,
              skipDuplicates: true, // Avoids errors on duplicate primary keys
            });
          }

          console.log("Data Wilayah Administratif seeded successfully");
          resolve();
        } catch (error) {
          reject(error);
        }
      })
      .on("error", (error) => reject(error));
  });
};

interface DapoWilayah {
  kodeWilayah: string;
  nama: string;
  idLevelWilayah: string;
  mstKodeWilayah: string;
  indukProvinsi: string;
  kodeWilayahIndukProvinsi: string;
  indukKabupaten: string;
  kodeWilayahIndukKabupaten: string;
}

const seedDapoWilayah = async (): Promise<void> => {
  const csvPath = "prisma/db-spmb/csv-seed/dapo_wilayah.csv";
  const results: DapoWilayah[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(csvPath)
      .pipe(csv({ separator: ";" }))
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        try {
          const chunkSize = 10000;

          for (let i = 0; i < results.length; i += chunkSize) {
            const chunk = results.slice(i, i + chunkSize).map((row) => ({
              kodeWilayah: row.kodeWilayah,
              nama: row.nama,
              idLevelWilayah: row.idLevelWilayah,
              mstKodeWilayah: row.mstKodeWilayah,
              indukProvinsi: row.indukProvinsi,
              kodeWilayahIndukProvinsi: row.kodeWilayahIndukProvinsi,
              indukKabupaten: row.indukKabupaten,
              kodeWilayahIndukKabupaten: row.kodeWilayahIndukKabupaten,
            }));

            console.log(
              `Inserting Dapo Wilayah data: ${i} - ${i + chunk.length}`
            );

            await dbSpmb.dapoWilayah.createMany({
              data: chunk,
              skipDuplicates: true,
            });
          }

          console.log("Data Dapo Wilayah seeded successfully");
          resolve();
        } catch (error) {
          reject(error);
        }
      })
      .on("error", (error) => reject(error));
  });
};

const seedPekerjaan = async (): Promise<void> => {
  const csvPath = "prisma/db-spmb/csv-seed/pekerjaan.csv";
  const results: Pendapatan[] = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(csvPath)
      .pipe(csv({ separator: ";" }))
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        try {
          for (const row of results) {
            console.log("seeding pekerjaan", row);
            await dbSpmb.pekerjaan.create({
              data: {
                id: row.id,
                nama: row.nama,
              },
            });
          }
          console.log("Data Pekerjaan seeded successfully");
          resolve();
        } catch (error) {
          reject(error);
        }
      })
      .on("error", (error) => reject(error));
  });
};

interface RentangPendapatan {
  id: string;
  nama: string;
  rentangAtas: string;
  rentangBawah: string;
}
const seedRentangPendapatan = async (): Promise<void> => {
  const csvPath = "prisma/db-spmb/csv-seed/rentang-pendapatan.csv";
  const results: RentangPendapatan[] = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(csvPath)
      .pipe(csv({ separator: ";" }))
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        try {
          for (const row of results) {
            console.log("seeding rentang pendapatan", row);
            await dbSpmb.rentangPendapatan.create({
              data: {
                id: row.id,
                nama: row.nama,
                rentangAtas: Number(row.rentangAtas),
                rentangBawah: Number(row.rentangBawah),
              },
            });
          }
          console.log("Data Rentang Pendapatan seeded successfully");
          resolve();
        } catch (error) {
          reject(error);
        }
      })
      .on("error", (error) => reject(error));
  });
};

async function main() {
  console.log("Seeding data...");
  await truncateBeforeSeed();
  await seedMataPelajaran();
  await seedSekolah();
  await seedWilayahAdministratif();
  await seedDapoWilayah();
  await seedPekerjaan();
  await seedRentangPendapatan();
  console.log("finish seeding data");
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await dbSpmb.$disconnect();
  });
