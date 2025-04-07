import { dbSpmb } from "@/lib/db-spmb";
import csv from "csv-parser";
import fs from "fs";

interface Pendapatan {
  id: string;
  nama: string;
}

const deleteBeforeSeed = async (): Promise<void> => {
  console.log("Deleting existing data...");
  await dbSpmb.wilayahAdministratif.deleteMany({});
  await dbSpmb.dapoWilayah.deleteMany({});
  await dbSpmb.rentangPendapatan.deleteMany({});
  await dbSpmb.pekerjaan.deleteMany({});
  console.log("Existing data deleted successfully");
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
          for (const row of results) {
            console.log("seeding wilayah Administratif", row);
            await dbSpmb.wilayahAdministratif.create({
              data: {
                id: row.id,
                nama: row.nama,
                indukId: row.indukId == "" ? null : row.indukId,
                tingkat: Number(row.tingkat),
              },
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
          for (const row of results) {
            console.log("seeding dapo wilayah", row);
            await dbSpmb.dapoWilayah.create({
              data: {
                kodeWilayah: row.kodeWilayah,
                nama: row.nama,
                idLevelWilayah: row.idLevelWilayah,
                mstKodeWilayah: row.mstKodeWilayah,
                indukProvinsi: row.indukProvinsi,
                kodeWilayahIndukProvinsi: row.kodeWilayahIndukProvinsi,
                indukKabupaten: row.indukKabupaten,
                kodeWilayahIndukKabupaten: row.kodeWilayahIndukKabupaten,
              },
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
  await deleteBeforeSeed();
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
