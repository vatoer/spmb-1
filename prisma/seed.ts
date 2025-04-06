import { dbSpmb } from "@/lib/db-spmb";
import csv from "csv-parser";
import fs from "fs";

interface Pendapatan {
  id: string;
  nama: string;
}

const deleteBeforeSeed = async (): Promise<void> => {
  console.log("Deleting existing data...");
  await dbSpmb.rentangPendapatan.deleteMany({});
  await dbSpmb.pekerjaan.deleteMany({});
  console.log("Existing data deleted successfully");
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
