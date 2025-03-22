// Extracting only the defined keys (excluding the [key: string]: unknown)
export type DefinedKeys<T> = {
  [K in keyof T as string extends K ? never : K]: T[K];
};

// usage example

// interface FtsCariSekolahResult {
//     npsn: string;
//     nama: string;
//     alamat?: string;
//     kelurahanDesa?: string;
//     dapoWilayahId: string;
//     status?: string;
//     rank: number;
//     rankNoStemming: number;
//     simInNama: number;
//     simInAlamat: number;
//     simInKelurahanDesa: number;
//     [key: string]: unknown; // Dynamic key
//   }

// Now, using DefinedKeys to extract only the known keys
// type FtsCariSekolahResultWithoutDynamicKeys = DefinedKeys<FtsCariSekolahResult>;

// // This type will contain only the defined keys
// const cleanResult: FtsCariSekolahResultWithoutDynamicKeys = {
//     npsn: "12345",
//     nama: "Some School",
//     dapoWilayahId: "1",
//     rank: 1,
//     rankNoStemming: 2,
//     simInNama: 100,
//     simInAlamat: 90,
//     simInKelurahanDesa: 80,
//   };
