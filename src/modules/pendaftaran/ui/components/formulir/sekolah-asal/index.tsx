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
import { SekolahAsal, sekolahAsalSchema } from "@/zod/schemas/sekolah/sekolah";
import { zodResolver } from "@hookform/resolvers/zod";
// import { SelectProvinsi } from "@/components/select-provinsi";
import { cn } from "@/lib/utils";
import {
  getSekolahAsalByNpsn,
  simpanSekolahAsal,
} from "@/modules/pendaftaran/actions/sekolah-asal";
import FormulirContainer from "@/modules/pendaftaran/ui/components/formulir/formulir-container";
import CumulativeErrors from "@/modules/shared/ui/components/cumulative-error";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface SekolahAsalFormProps {
  nextStep?: () => void;
  defaultValuesSekolahAsal: SekolahAsal;
  pendaftaranId: string;
}

export const SekolahAsalForm = ({
  nextStep = () => {},
  defaultValuesSekolahAsal,
  pendaftaranId,
}: SekolahAsalFormProps) => {
  const form = useForm<SekolahAsal>({
    resolver: zodResolver(sekolahAsalSchema),
    defaultValues: defaultValuesSekolahAsal,
  });

  const [isValidNpsn, setIsValidNpsn] = useState(false);

  const { handleSubmit, formState, watch } = form;
  const { isSubmitting } = formState;

  const npsn = watch("npsn");

  useEffect(() => {
    if (npsn?.length === 8) {
      const fetchData = async () => {
        const response = await getSekolahAsalByNpsn(npsn);
        if (response.success) {
          setIsValidNpsn(true);
          form.setValue("namaSekolah", response.data.nama);
          form.setValue("alamatSekolah", response.data.alamat);
        } else {
          toast.error(response.message);
          form.setValue("namaSekolah", "-");
          form.setValue("alamatSekolah", "-");
        }
      };
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [npsn]);

  const onSubmit = async (data: SekolahAsal) => {
    console.log(data);
    const response = await simpanSekolahAsal(data, pendaftaranId);
    if (response.success) {
      toast.success("Data Sekolah Asal berhasil disimpan");
    } else {
      toast.error(response.message);
    }
    nextStep();
  };

  useEffect(() => {
    form.reset(defaultValuesSekolahAsal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormulirContainer title="Sekolah Asal">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-2 pb-24"
        >
          <div className="flex flex-col md:flex-row gap-2 items-start">
            <FormField
              control={form.control}
              name="npsn"
              render={({ field }) => (
                <FormItem className="md:w-1/4">
                  <FormLabel>NPSN</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="npsn 10 digit"
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
              name="namaSekolah"
              render={({ field }) => (
                <FormItem className="md:w-3/4">
                  <FormLabel>Nama Sekolah</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isValidNpsn}
                      placeholder="nama sekolah"
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

          <FormField
            control={form.control}
            name="alamatSekolah"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alamat Sekolah</FormLabel>
                <FormControl>
                  <Input
                    disabled={isValidNpsn}
                    placeholder="alamat sekolah"
                    {...field}
                    value={field.value ?? ""}
                    className="bg-background h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col md:flex-row gap-2">
            <FormField
              control={form.control}
              name="tahunMasuk"
              render={({ field }) => (
                <FormItem className="md:w-1/4">
                  <FormLabel>Tahun masuk</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="16 digit"
                      {...field}
                      type="number"
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
              name="tahunLulus"
              render={({ field }) => (
                <FormItem className="md:w-1/4">
                  <FormLabel htmlFor="ibu-jenjang-pendidikan-form-item">
                    Tahun Lulus
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="npsn 10 digit"
                      {...field}
                      type="number"
                      value={field.value ?? ""}
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
              <span className="text-sm font-semibold">Simpan Sekolah Asal</span>
              {isSubmitting && <Loader className="animate-spin mr-2 h-4 w-4" />}
            </Button>
          </div>
        </form>
      </Form>
    </FormulirContainer>
  );
};

export default SekolahAsalForm;
