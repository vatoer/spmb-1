"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
// import { SelectProvinsi } from "@/components/select-provinsi";
import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";

import { simpanDataDiri } from "@/modules/pendaftaran/actions/data-diri";
import { Select } from "@/modules/pendaftaran/ui/components/formulir/select";
import CumulativeErrors from "@/modules/shared/ui/components/cumulative-error";
import { isValidDateString, parseNIK } from "@/utils/kependudukan";
import {
  Agama,
  GolonganDarah,
  JenisKelamin,
  Kewarganegaraan,
} from "@/zod/schemas/shared";
import { DataDiri, dataDiriSchema } from "@/zod/schemas/siswa/siswa";
import { ChevronDown, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SelectWilayah = dynamic(
  () => import("@/modules/shared/ui/components/select-wilayah"),
  {
    ssr: false,
    loading: () => (
      <div className="">
        <Skeleton className="h-12 w-full" />
      </div>
    ),
  }
);

const defaultValuesDataDiri = {
  nama: "",
  kewarganegaraan: Kewarganegaraan.WNI,
  tempatLahir: "",
  tanggalLahir: new Date(),
  agama: Agama.Lainnya,
  golonganDarah: GolonganDarah.TIDAK_TAHU,
  jenisKelamin: JenisKelamin.LakiLaki,
  nisn: "",
  kk: "",
  nik: "",
  // jenjangDikdasmen: JenjangDikdasmen.SD,
  alamat: "",
  rt: "",
  rw: "",
  provinsi: "-",
  kotaKabupaten: "-",
  kecamatan: "-",
  desaKelurahan: "-",
  wilayahAdministratifId: "",
  // statusDomisili: "LAINNYA",
};

const checkParentPrefix = (parent: string, child: string) => {
  if (parent === "-" || parent === "") return false;
  return child.startsWith(parent);
};

interface DataDiriFormProps {
  pendaftaranId: string;
  nextStep?: () => void;
}

export const DataDiriForm = ({
  pendaftaranId,
  nextStep = () => {},
}: DataDiriFormProps) => {
  const [defaultValues, setDefaultValues] = useState(defaultValuesDataDiri);

  const form = useForm<DataDiri>({
    mode: "onBlur",
    resolver: zodResolver(dataDiriSchema),
    defaultValues: defaultValues,
  });

  const { handleSubmit, watch, setValue, trigger, formState, reset } = form;
  const { isSubmitting } = formState;

  const wilayah = watch("wilayahAdministratifId");
  const provinsi = watch("provinsi");
  const kotaKabupaten = watch("kotaKabupaten");
  const kecamatan = watch("kecamatan");
  const desaKelurahan = watch("desaKelurahan");
  const nik = watch("nik");
  // const tanggalLahir = watch("tanggalLahir");

  const setWilayah = (value: string) => {
    const provinsi = value.slice(0, 2);
    const kotaKabupaten = value.slice(0, 4);
    const kecamatan = value.slice(0, 6);
    // const desaKelurahan = value.slice(0, 10);

    console.log("wilayah", provinsi, kotaKabupaten, kecamatan, value);

    setValue("provinsi", provinsi);
    setValue("kotaKabupaten", kotaKabupaten);
    setValue("kecamatan", kecamatan);
    setValue("desaKelurahan", value);
  };

  const [initProvinsi, setInitProvinsi] = useState<string>("-");
  const [initKotaKabupaten, setInitKotaKabupaten] = useState("-");
  const [initKecamatan, setInitKecamatan] = useState("-");
  const [initDesaKelurahan, setInitDesaKelurahan] = useState("-");

  const setInitWilayah = (value: string) => {
    const provinsi = value.slice(0, 2);
    const kotaKabupaten = value.slice(0, 4);
    const kecamatan = value.slice(0, 6);
    const desaKelurahan = value;
    setInitProvinsi(provinsi);
    setInitKotaKabupaten(kotaKabupaten);
    setInitKecamatan(kecamatan);
    setInitDesaKelurahan(desaKelurahan);
  };

  const clearInitDesaKelurahan = () => {
    setInitDesaKelurahan("-");
    setValue("wilayahAdministratifId", "-");
    setValue("desaKelurahan", "-");
  };

  const clearInitKecamatan = () => {
    clearInitDesaKelurahan();
    setInitKecamatan("-");
    setValue("kecamatan", "-");
  };

  const clearInitKotaKabupaten = () => {
    clearInitKecamatan();
    setInitKotaKabupaten("-");
    setValue("kotaKabupaten", "-");
  };

  const clearInitProvinsi = () => {
    clearInitKotaKabupaten();
    setInitProvinsi("-");
    setValue("provinsi", "-");
  };

  const checkChainWilayah = () => {
    if (!checkParentPrefix(provinsi, kotaKabupaten)) {
      toast.error("Provinsi dan Kota/Kabupaten tidak sesuai");
      return false;
    }
    if (!checkParentPrefix(kotaKabupaten, kecamatan)) {
      toast.error("Kota/Kabupaten dan Kecamatan tidak sesuai");
      return false;
    }
    if (!checkParentPrefix(kecamatan, desaKelurahan)) {
      toast.error("Kecamatan dan Desa/Kelurahan tidak sesuai");
      return false;
    }
    return true;
  };

  // Fetch default values from localStorage and reset the form
  useEffect(() => {
    const dataDiri = localStorage.getItem("dataDiri");
    if (dataDiri) {
      const parsedData = JSON.parse(dataDiri);
      setDefaultValues(parsedData); // Update the state
      reset(parsedData); // Reset the form with the new default values
      setInitWilayah(parsedData.wilayahAdministratifId);
      setWilayah(parsedData.wilayahAdministratifId);
      // setValue("provinsi", parsedData.wilayahAdministratifId.slice(0, 2));
    } else {
      reset(defaultValuesDataDiri); // Reset with initial defaults if no localStorage data
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data: DataDiri) => {
    console.log(data);
    if (!checkChainWilayah()) {
      return;
    }

    const response = await simpanDataDiri(data, pendaftaranId);
    if (response?.success === false) {
      toast.error("Gagal menyimpan data diri.");
      console.error(response?.error);
      return;
    }
    if (response?.success === true) {
      toast.success("Data diri berhasil disimpan.");
    }
    // Simpan data diri ke local storage
    localStorage.setItem("dataDiri", JSON.stringify(response.data));

    //updateFormData(data);
    // toast({
    //   duration: 2000,
    //   title: "Data Diri",
    //   description: "Data diri berhasil disimpan.",
    // });
    nextStep();
  };

  useEffect(() => {
    console.log(wilayah);
  }, [wilayah]);

  useEffect(() => {
    // on initial load if kotaKabupaten is set and the prefix is same as provinsi then set it from local storage
    if (checkParentPrefix(provinsi, kotaKabupaten)) {
      setValue("kotaKabupaten", kotaKabupaten);
      if (provinsi === initProvinsi) {
        setInitProvinsi("-");
      }
    } else {
      if (initProvinsi === "-") {
        setValue("kotaKabupaten", "-");
      } else {
        setValue("kotaKabupaten", initKotaKabupaten);
      }
    }
    console.log(provinsi);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provinsi, setValue]);

  useEffect(() => {
    if (checkParentPrefix(kotaKabupaten, kecamatan)) {
      setValue("kecamatan", kecamatan);
      if (kotaKabupaten === initKotaKabupaten) {
        setInitKotaKabupaten("-");
      }
    } else {
      if (initKotaKabupaten === "-") {
        setValue("kecamatan", "-");
      } else {
        setValue("kecamatan", initKecamatan);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kotaKabupaten, setValue]);

  useEffect(() => {
    if (checkParentPrefix(kecamatan, desaKelurahan)) {
      setValue("desaKelurahan", desaKelurahan);
      if (kecamatan === initKecamatan) {
        setInitKecamatan("-");
      }
    } else {
      if (initKecamatan === "-") {
        setValue("desaKelurahan", "-");
      } else {
        setValue("desaKelurahan", initDesaKelurahan);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kecamatan, setValue]);

  useEffect(() => {
    setValue("wilayahAdministratifId", desaKelurahan);
  }, [desaKelurahan, setValue]);

  useEffect(() => {
    const cekNik = async () => {
      if (!nik || nik.length < 16) return; // Avoid unnecessary execution

      if (nik.length === 16) {
        const nikData = parseNIK(nik);
        if (nikData) {
          const isValid = await trigger("nik");
          if (isValid) {
            setValue("tanggalLahir", nikData.birthDate);
            setValue("jenisKelamin", nikData.gender);
          }
        } else {
          toast.error("NIK tidak valid");
        }
      }
      // else {
      //   trigger("nik"); // Only revalidate if `nik` is longer than expected
      // }
    };

    cekNik();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nik]);

  return (
    <div className="w-full max-w-3xl px-2 md:p-4 md:shadow-md border-none md:border md:border-gray-300 bg-white rounded-lg">
      <div className="flex flex-col w-full items-center py-4 md:py-0">
        <h1 className="hidden md:block text-2xl md:text-2xl text-center font-semibold">
          Data Diri
        </h1>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full space-y-6 pb-24"
          >
            <FormField
              control={form.control}
              name="nama"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="nama"
                      {...field}
                      className="bg-background h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col md:flex-row gap-6 md:gap-2 items-start">
              <FormField
                control={form.control}
                name="kk"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/3">
                    <FormLabel>Nomor KK</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="16 digit"
                        {...field}
                        className="bg-background h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nik"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/3">
                    <FormLabel>NIK</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="16 digit"
                        {...field}
                        className="bg-background h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nisn"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/3">
                    <FormLabel>NISN</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="10 digit"
                        {...field}
                        className="bg-background h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-6 md:gap-2 items-start">
              <FormField
                control={form.control}
                name="tempatLahir"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/2">
                    <FormLabel>Tempat Lahir</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Kota/Kabupaten kelahiran"
                        {...field}
                        className="bg-background h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tanggalLahir"
                render={({ field }) => (
                  <FormItem className="md:w-1/2">
                    <FormLabel>Tanggal Lahir</FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        placeholder="tanggal lahir"
                        {...field}
                        value={
                          field.value && isValidDateString(field.value)
                            ? new Date(field.value).toLocaleDateString()
                            : ""
                        }
                        className="h-12 bg-muted"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jenisKelamin"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/2">
                    <FormLabel>Jenis Kelamin</FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        placeholder="Jenis Kelamin"
                        {...field}
                        className="h-12 bg-muted"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
              control={form.control}
              name="tanggalLahir"
              render={({ field }) => (
                <FormItem className="md:w-1/2">
                  <FormLabel htmlFor="tanggal-lahir">Tanggal Lahir</FormLabel>
                  <FormControl>
                    <InputDatePicker
                      date={tanggalLahir}
                      calendarOptions={{
                        fromDate: new Date(
                          new Date().setFullYear(new Date().getFullYear() - 18)
                        ),
                        toDate: new Date(
                          new Date().setFullYear(new Date().getFullYear() - 3)
                        ),
                      }}
                      inputId="tanggal-lahir"
                      onDateSelected={(date) => field.onChange(date)}
                      className="h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            </div>
            <FormField
              control={form.control}
              name="jenjangDikdasmen"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="jenjang-form-item">Jenjang</FormLabel>
                  <FormControl>
                    <div className="relative w-full">
                      <Select
                        id="jenjang-form-item"
                        {...field}
                        className="h-12"
                      >
                        <option value="">Pilih Jenjang</option>
                        <option value="SD">SD/MI Sederajat</option>
                        <option value="SMP">SMP/MTs Sederajat</option>
                        <option value="SMA">SMA/MA Sederajat </option>
                      </Select>
                      <ChevronDown
                        size={20}
                        className="peer-focus:visible text-gray-500 opacity-50 peer-focus:opacity-100 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="h-0 py-4 border-b-2"></div>

            <h1 className="text-lg pt-4">Domisili</h1>

            <FormField
              control={form.control}
              name="statusDomisili"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="status-domisili-form-item">
                    Status Domisili
                  </FormLabel>
                  <FormControl>
                    <div className="relative w-full">
                      <Select
                        id="status-domisili-form-item"
                        {...field}
                        className=" h-12"
                      >
                        <option value="">Pilih Status Domisili</option>
                        <option value="SESUAI_KK">Sesuai Kartu Keluarga</option>
                        <option value="SURAT_PINDAH">Surat Pindah</option>
                        <option value="SESUAI_DOMISILI_PONDOK">
                          Sesuai Domisili Pondok
                        </option>
                        <option value="SESUAI_DOMISILI_PANTI_ASUHAN">
                          Sesuai Domisili Panti Asuhan
                        </option>
                        <option value="LAINNYA">Lainnya</option>
                      </Select>
                      <ChevronDown
                        size={20}
                        className="peer-focus:visible text-gray-500 opacity-50 peer-focus:opacity-100 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full flex-col md:flex-row gap-6 md:gap-2 items-start">
              <FormField
                control={form.control}
                name="provinsi"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/2">
                    <FormLabel
                      htmlFor="select-provinsi"
                      id="select-provinsi-label"
                    >
                      Provinsi
                    </FormLabel>
                    <FormControl>
                      <SelectWilayah
                        tingkat={1}
                        inputId="select-provinsi"
                        value={field.value}
                        onChange={(selected, { action }) => {
                          let value = "";
                          if (typeof selected === "object" && selected) {
                            value = selected.value;
                          } else {
                            value = selected ?? "";
                          }
                          field.onChange(value);
                          if (action === "clear") {
                            clearInitProvinsi();
                            console.log("provinsi clear", value);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="kotaKabupaten"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/2">
                    <FormLabel
                      id="select-kota-kabupaten-label"
                      htmlFor="select-kota-kabupaten"
                    >
                      Kota Kabupaten
                    </FormLabel>
                    <FormControl>
                      <SelectWilayah
                        tingkat={2}
                        inputId="select-kota-kabupaten"
                        value={field.value}
                        induk={provinsi}
                        onChange={(selected, { action }) => {
                          let value = "";
                          if (typeof selected === "object" && selected) {
                            value = selected.value;
                          } else {
                            value = selected ?? "";
                          }
                          field.onChange(value);
                          if (action === "clear") {
                            clearInitKotaKabupaten();
                            console.log("kotaKabupaten clear", value);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-6 md:gap-2 items-start">
              <FormField
                control={form.control}
                name="kecamatan"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/2">
                    <FormLabel
                      id="select-kecamatan-label"
                      htmlFor="select-kecamatan"
                    >
                      Kecamatan
                    </FormLabel>
                    <FormControl>
                      <SelectWilayah
                        inputId="select-kecamatan"
                        tingkat={3}
                        value={field.value}
                        induk={kotaKabupaten}
                        onChange={(selected, { action }) => {
                          let value = "";
                          if (typeof selected === "object" && selected) {
                            value = selected.value;
                          } else {
                            value = selected ?? "";
                          }
                          field.onChange(value);
                          if (action === "clear") {
                            clearInitKecamatan();
                            console.log("kecamatan clear", value);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="desaKelurahan"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/2">
                    <FormLabel
                      id="select-desa-kelurahan-label"
                      htmlFor="select-desa-kelurahan"
                    >
                      Desa/Kelurahan
                    </FormLabel>
                    <FormControl>
                      <SelectWilayah
                        inputId="select-desa-kelurahan"
                        tingkat={4}
                        value={field.value}
                        induk={kecamatan}
                        onChange={(selected, { action }) => {
                          let value = "";
                          if (typeof selected === "object" && selected) {
                            value = selected.value;
                          } else {
                            value = selected ?? "";
                          }
                          field.onChange(value);
                          if (action === "clear") {
                            clearInitDesaKelurahan();
                            console.log("desaKelurahan clear", value);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="alamat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alamat Domisili</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Jl...Blok..."
                      {...field}
                      className="bg-background h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col md:flex-row gap-6 md:gap-2 items-start">
              <FormField
                control={form.control}
                name="rt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>RT</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="000"
                        {...field}
                        className="bg-background h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rw"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>RW</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="000"
                        {...field}
                        className="bg-background h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <CumulativeErrors errors={form.formState.errors} verbose />

            <div
              className={cn(
                "flex flex-col sm:flex-row  justify-center sm:justify-end  gap-2 mt-12 "
              )}
            >
              <Button
                type="submit"
                size={"lg"}
                className="hover:cursor-pointer w-full sm:w-1/2 md:w-1/3"
                disabled={isSubmitting}
              >
                <span className="text-sm font-semibold">Simpan Data Diri</span>
                {isSubmitting && (
                  <Loader className="animate-spin mr-2 h-4 w-4" />
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default DataDiriForm;
