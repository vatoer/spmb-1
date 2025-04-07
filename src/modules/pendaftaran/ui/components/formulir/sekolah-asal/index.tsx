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
import FormulirContainer from "@/modules/pendaftaran/ui/components/formulir/formulir-container";
import CumulativeErrors from "@/modules/shared/ui/components/cumulative-error";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface SekolahAsalFormProps {
  nextStep?: () => void;
  defaultValuesSekolahAsal: SekolahAsal;
}

export const SekolahAsalForm = ({
  nextStep = () => {},
  defaultValuesSekolahAsal,
}: SekolahAsalFormProps) => {
  const form = useForm<SekolahAsal>({
    resolver: zodResolver(sekolahAsalSchema),
    defaultValues: defaultValuesSekolahAsal,
  });

  const { handleSubmit } = form;

  const onSubmit = (data: SekolahAsal) => {
    console.log(data);
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
          <div className="flex flex-col md:flex-row gap-2">
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
              "flex flex-col sm:flex-row  sm:justify-end gap-2 mt-6"
            )}
          >
            <Button type="submit">Simpan</Button>
          </div>
        </form>
      </Form>
    </FormulirContainer>
  );
};

export default SekolahAsalForm;
