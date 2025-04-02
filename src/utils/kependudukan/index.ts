export function isValidDateString(dateString: string | Date): boolean {
  if (dateString instanceof Date) {
    return !isNaN(dateString.getTime());
  }

  if (typeof dateString !== "string" || dateString.trim() === "") {
    return false;
  }

  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

enum JenisKelamin {
  LakiLaki = "Laki-laki",
  Perempuan = "Perempuan",
}

interface NIKData {
  birthDate: Date;
  gender: JenisKelamin;
  province: string;
  regency: string;
  district: string;
  uniqueNumber: string;
  checksum: string;
}

interface NITData {
  countryCode: string;
  representativeCode: string;
  birthDate: Date;
  gender: JenisKelamin;
  uniqueNumber: string;
  checksum: string;
}

/**
 * Parses a birth date and determines gender based on Indonesian ID format.
 */
function parseBirthDateAndGender(segment: string): {
  birthDate: Date | null;
  gender: JenisKelamin | null;
} {
  if (!/^\d{6}$/.test(segment)) return { birthDate: null, gender: null };

  let day = parseInt(segment.slice(0, 2), 10);
  const month = segment.slice(2, 4);
  const yearSuffix = segment.slice(4, 6); // Extract last two digits of the year

  // Determine gender (adjust day if necessary)
  const gender = day > 40 ? JenisKelamin.Perempuan : JenisKelamin.LakiLaki;
  if (day > 40) day -= 40;

  // Determine the full year
  const currentYear = new Date().getFullYear() % 100; // Get last two digits of the current year
  const century = parseInt(yearSuffix, 10) <= currentYear ? "20" : "19";
  const fullYear = `${century}${yearSuffix}`;

  const birthDateStr = `${fullYear}-${month}-${day
    .toString()
    .padStart(2, "0")}`;

  return isValidDateString(birthDateStr)
    ? { birthDate: new Date(birthDateStr), gender }
    : { birthDate: null, gender: null };
}

/**
 * Parses an Indonesian NIK (Nomor Induk Kependudukan).
 */
export const parseNIK = (nik: string): NIKData | null => {
  if (!/^\d{16}$/.test(nik)) return null;

  const provinceCode = nik.slice(0, 2);
  const regencyCode = nik.slice(2, 4);
  const districtCode = nik.slice(4, 6);
  const birthDateSegment = nik.slice(6, 12);
  const uniqueNumber = nik.slice(12, 15);
  const checksum = nik.slice(15, 16);

  const { birthDate, gender } = parseBirthDateAndGender(birthDateSegment);
  if (!birthDate || !gender) return null;

  return {
    birthDate,
    gender,
    province: provinceCode,
    regency: regencyCode,
    district: districtCode,
    uniqueNumber,
    checksum,
  };
};

/**
 * Parses an Indonesian NIT (Nomor Induk Tenaga kerja di luar negeri).
 */
export const parseNIT = (nit: string): NITData | null => {
  if (!/^\d{16}$/.test(nit) || !nit.startsWith("99")) return null;

  const countryCode = nit.slice(2, 5);
  const representativeCode = nit.slice(5, 6);
  const birthDateSegment = nit.slice(6, 12);
  const uniqueNumber = nit.slice(12, 15);
  const checksum = nit.slice(15, 16);

  const { birthDate, gender } = parseBirthDateAndGender(birthDateSegment);
  if (!birthDate || !gender) return null;

  return {
    countryCode,
    representativeCode,
    birthDate,
    gender,
    uniqueNumber,
    checksum,
  };
};

/**
 * Determines whether a given ID is a NIK or NIT and parses accordingly.
 */
export const parseNomorInduk = (nomor: string): NIKData | NITData | null => {
  return nomor.startsWith("99") ? parseNIT(nomor) : parseNIK(nomor);
};

// usage example
// const nik = "3204110606970001";
// const nit = "9905110606970001";
// 3276011201010001
// 3276015201010002
// 3276010102020003
// 3276014102020004
// 3276012503030005
// 3276016503030006
// 3276013104040007
// 3276017104040008
// 3276011505050009
// 3276015505050010

// 3276015201010001
// 3276016002020002
// 3276014503030003
// 3276015104040004
// 3276015505050005
// 3276016206060006
// 3276017007070007
// 3276014808080008
// 3276015309090009
// 3276016510100010
