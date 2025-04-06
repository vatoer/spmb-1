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
// import { SelectProvinsi } from "@/components/select-provinsi";
import { cn } from "@/lib/utils";
// import { useWizardForm } from "@/modules/pendaftaran/hooks/use-wizard-form";
import {
  getOptionsRentangPendapatan,
  RentangPendapatanOption,
} from "@/actions/common/rentang-pendapatan";
import { Skeleton } from "@/components/ui/skeleton";
import { simpanDataOrangTua } from "@/modules/pendaftaran/actions/data-orang-tua";
import { Select } from "@/modules/pendaftaran/ui/components/formulir/select";
import CumulativeErrors from "@/modules/shared/ui/components/cumulative-error";
import { OrangTua, orangTuaSchema } from "@/zod/schemas/orang-tua/orang-tua";
import { JenjangPendidikan } from "@/zod/schemas/shared";
import { ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SelectPekerjaan = dynamic(
  () => import("@/modules/shared/ui/components/select-pekerjaan"),
  {
    ssr: false,
    loading: () => (
      <div className="">
        <Skeleton className="h-12 w-full" />
      </div>
    ),
  }
);

// const defaultValuesDataOrangTua: OrangTua = {
//   ibu: {
//     nama: "",
//     nik: "",
//     kk: "",
//     pekerjaan: "",
//     jenisKelamin: JenisKelamin.Perempuan,
//     jenjangPendidikan: "",
//     pendapatan: "",
//   },
//   ayah: {
//     nama: "",
//     nik: "",
//     kk: "",
//     jenisKelamin: JenisKelamin.LakiLaki,
//     pekerjaan: "",
//     jenjangPendidikan: "",
//     pendapatan: "",
//   },
// };

const jenjangPendidikanOptions = Object.entries(JenjangPendidikan).map(
  ([value, label]) => ({
    value,
    label,
  })
);

interface DataOrangTuaFormProps {
  nextStep?: () => void;
  pendaftaranId: string;
  defaultValuesDataOrangTua: OrangTua;
}
export const DataOrangTuaForm = ({
  nextStep = () => {},
  pendaftaranId,
  defaultValuesDataOrangTua,
}: DataOrangTuaFormProps) => {
  const form = useForm<OrangTua>({
    resolver: zodResolver(orangTuaSchema),
    defaultValues: defaultValuesDataOrangTua,
  });

  const { handleSubmit } = form;

  const onSubmit = async (data: OrangTua) => {
    console.log(data);
    // save to session storage
    sessionStorage.setItem("dataOrangTua", JSON.stringify(data));
    const response = await simpanDataOrangTua(data, pendaftaranId);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
    nextStep();
  };

  useEffect(() => {
    form.reset(defaultValuesDataOrangTua);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [rentangPendapatanOptions, setRentangPendapatanOptions] = useState<
    RentangPendapatanOption[]
  >([]);
  // get optiosn pekerjaan
  useEffect(() => {
    const fetchOptions = async () => {
      const rentangPendapatan = await getOptionsRentangPendapatan();
      setRentangPendapatanOptions(rentangPendapatan);
    };
    fetchOptions();
  }, []);

  return (
    <div className="w-full max-w-3xl px-2 md:p-4 md:shadow-md border-none md:border md:border-gray-300 bg-white rounded-lg">
      <div className="flex flex-col w-full items-center py-4 md:py-0">
        <h1 className="hidden md:block text-2xl md:text-2xl text-center font-semibold">
          Data Orang Tua
        </h1>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full space-y-2 pb-24"
          >
            <h1 className="text-lg">Data Ibu</h1>
            <FormField
              control={form.control}
              name="ibu.nama"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="nama"
                      {...field}
                      value={field.value ?? ""}
                      className="bg-background h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col md:flex-row gap-2 items-start">
              <FormField
                control={form.control}
                name="ibu.kk"
                render={({ field }) => (
                  <FormItem className="md:w-1/2">
                    <FormLabel>Nomor Kartu Keluarga</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="16 digit"
                        {...field}
                        value={field.value ?? ""}
                        className="bg-background h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ibu.nik"
                render={({ field }) => (
                  <FormItem className="md:w-1/2">
                    <FormLabel>NIK</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="16 digit"
                        {...field}
                        value={field.value ?? ""}
                        className="bg-background h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-2 items-start">
              <FormField
                control={form.control}
                name="ibu.jenjangPendidikan"
                render={({ field }) => (
                  <FormItem className="md:w-1/3">
                    <FormLabel htmlFor="ibu-jenjang-pendidikan-form-item">
                      Jenjang Pendidikan
                    </FormLabel>
                    <FormControl>
                      <div className="relative w-full">
                        <Select
                          id="ibu-jenjang-pendidikan-form-item"
                          {...field}
                          className="h-12"
                        >
                          <option value="">Pilih Jenjang Pendidikan Ibu</option>
                          {jenjangPendidikanOptions.map((option) => (
                            <option
                              key={option.value}
                              value={option.value}
                              className="custom-select-option"
                            >
                              {option.label}
                            </option>
                          ))}
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
              <FormField
                control={form.control}
                name="ibu.pekerjaan"
                render={({ field }) => (
                  <FormItem className="md:w-1/2">
                    <FormLabel>Pekerjaan</FormLabel>
                    <FormControl>
                      <SelectPekerjaan
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
                            console.log("pekerjaan ibu clear", value);
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
                name="ibu.pendapatan"
                render={({ field }) => (
                  <FormItem className="md:w-1/2">
                    <FormLabel>Pendapatan perbulan</FormLabel>
                    <FormControl>
                      <Select
                        id="ibu-rentang-pendapatan-form-item"
                        {...field}
                        // value={field.value ?? ""}
                        className="h-12"
                      >
                        <option value="">Pilih Rentang Pendapatan</option>
                        {rentangPendapatanOptions.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            className="custom-select-option"
                          >
                            {option.label}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="h-0 py-4 border-b border-gray-100"></div>

            <h1 className="text-lg pt-4">Data Ayah</h1>

            <FormField
              control={form.control}
              name="ayah.nama"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="nama"
                      {...field}
                      value={field.value ?? ""}
                      className="bg-background h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col md:flex-row gap-2 items-start">
              <FormField
                control={form.control}
                name="ayah.kk"
                render={({ field }) => (
                  <FormItem className="md:w-1/2">
                    <FormLabel>Nomor Kartu Keluarga</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="16 digit"
                        {...field}
                        value={field.value ?? ""}
                        className="bg-background h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ayah.nik"
                render={({ field }) => (
                  <FormItem className="md:w-1/2">
                    <FormLabel>NIK</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="16 digit"
                        {...field}
                        value={field.value ?? ""}
                        className="bg-background h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-2 items-start">
              <FormField
                control={form.control}
                name="ayah.jenjangPendidikan"
                render={({ field }) => (
                  <FormItem className="md:w-1/3">
                    <FormLabel htmlFor="ayah-jenjang-pendidikan-form-item">
                      Jenjang Pendidikan
                    </FormLabel>
                    <FormControl>
                      <div className="relative w-full">
                        <Select
                          id="ayah-jenjang-pendidikan-form-item"
                          {...field}
                          // value={field.value ?? ""}
                          className="h-12"
                        >
                          <option value="">
                            Pilih Jenjang Pendidikan Ayah
                          </option>
                          {jenjangPendidikanOptions.map((option) => (
                            <option
                              key={option.value}
                              value={option.value}
                              className="custom-select-option"
                            >
                              {option.label}
                            </option>
                          ))}
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
              <FormField
                control={form.control}
                name="ayah.pekerjaan"
                render={({ field }) => (
                  <FormItem className="md:w-1/2">
                    <FormLabel>Pekerjaan</FormLabel>
                    <FormControl>
                      <SelectPekerjaan
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
                name="ayah.pendapatan"
                render={({ field }) => (
                  <FormItem className="md:w-1/2">
                    <FormLabel>Pendapatan perbulan</FormLabel>
                    <FormControl>
                      <Select
                        id="ayah-rentang-pendapatan-form-item"
                        {...field}
                        // value={field.value ?? ""}
                        className="h-12"
                      >
                        <option value="">Pilih Rentang Pendapatan</option>
                        {rentangPendapatanOptions.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            className="custom-select-option"
                          >
                            {option.label}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <CumulativeErrors errors={form.formState.errors} verbose />

            <div
              className={cn(
                "flex flex-col sm:flex-row  sm:justify-end gap-2 mt-6"
              )}
            >
              <Button type="submit">Simpan</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default DataOrangTuaForm;
