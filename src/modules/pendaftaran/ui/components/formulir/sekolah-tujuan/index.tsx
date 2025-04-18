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
import {
  SekolahTujuan,
  sekolahTujuanSchema,
} from "@/zod/schemas/sekolah/sekolah";
import { zodResolver } from "@hookform/resolvers/zod";
// import { SelectProvinsi } from "@/components/select-provinsi";
import { SekolahWithWilayah } from "@/data/common/sekolah";
import { cn } from "@/lib/utils";
import {
  getSekolahTujuanByNpsn,
  simpanSekolahTujuan,
} from "@/modules/pendaftaran/actions/sekolah-tujuan";
import FormulirContainer from "@/modules/pendaftaran/ui/components/formulir/formulir-container";
import CardSekolah from "@/modules/sekolah/ui/components/card-sekolah";
import CardMessage from "@/modules/shared/ui/components/card-message";
import CumulativeErrors from "@/modules/shared/ui/components/cumulative-error";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface SekolahTujuanFormProps {
  nextStep?: () => void;
  defaultValuesSekolahTujuan: SekolahTujuan;
  pendaftaranId: string;
}

export const SekolahTujuanForm = ({
  nextStep = () => {},
  defaultValuesSekolahTujuan,
  pendaftaranId,
}: SekolahTujuanFormProps) => {
  const form = useForm<SekolahTujuan>({
    resolver: zodResolver(sekolahTujuanSchema),
    defaultValues: defaultValuesSekolahTujuan,
  });

  const [isValidNpsn, setIsValidNpsn] = useState(false);

  const { handleSubmit, formState, watch, trigger } = form;
  const { isSubmitting } = formState;
  const [sekolah, setSekolah] = useState<SekolahWithWilayah | null>(null);

  const npsn = watch("npsn");

  // useEffect(() => {
  //   if (npsn?.length === 8) {
  //     const fetchData = async () => {
  //       const response = await getSekolahTujuanByNpsn(npsn);
  //       if (response.success) {
  //         setIsValidNpsn(true);
  //       }
  //       if (!response.success) {
  //         setIsValidNpsn(false);
  //         toast.error(response.message);
  //       }
  //       console.log(response);
  //     };
  //     fetchData();
  //   }
  // }, [npsn]);

  const checkNpsn = async () => {
    if (npsn?.length === 8) {
      const response = await getSekolahTujuanByNpsn(npsn);
      if (response.success) {
        setIsValidNpsn(true);
        setSekolah(response.data);
      } else {
        setIsValidNpsn(false);
        setSekolah(null);
        toast.error(response.message);
      }
    }
  };

  const onSubmit = async (data: SekolahTujuan) => {
    console.log(data);
    const response = await simpanSekolahTujuan(data, pendaftaranId);
    if (response.success) {
      toast.success("Data Sekolah Tujuan berhasil disimpan");
    } else {
      toast.error(response.message);
    }
    nextStep();
  };

  useEffect(() => {
    form.reset(defaultValuesSekolahTujuan);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormulirContainer title="Sekolah Tujuan">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-2 pb-24"
        >
          <div className="flex flex-col md:flex-row gap-2 items-start justify-center">
            <FormField
              control={form.control}
              name="npsn"
              render={({ field }) => (
                <FormItem className="md:w-1/2">
                  <FormLabel>Nomor Pokok Sekolah Nasional(NPSN)</FormLabel>
                  <FormControl>
                    <div className="flex flex-row gap-2">
                      <Input
                        placeholder="npsn 10 digit"
                        {...field}
                        value={field.value ?? ""}
                        className="bg-background h-12"
                      />
                      <Button
                        type="button"
                        className="h-12 hover:cursor-pointer"
                        onClick={async () => {
                          await trigger("npsn");
                          await checkNpsn();
                        }}
                      >
                        Cek
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-2 justify-center">
            <Link
              className="text-sm hover:underline hover:text-blue-500"
              href={"#"}
            >
              Tidak tahu npns? klik disini untuk mencari sekolah pilihanmu
            </Link>
          </div>

          <CardSekolah sekolah={sekolah} />

          <CardMessage />
          <CumulativeErrors errors={form.formState.errors} verbose={false} />

          <div
            className={cn(
              "flex flex-col sm:flex-row  justify-center sm:justify-end  gap-2 mt-12 "
            )}
          >
            <Button
              type="submit"
              size={"lg"}
              className="hover:cursor-pointer w-full sm:w-1/2 md:w-1/3"
              disabled={isSubmitting || !isValidNpsn}
            >
              <span className="text-sm font-semibold">
                Simpan Sekolah Tujuan
              </span>
              {isSubmitting && <Loader className="animate-spin mr-2 h-4 w-4" />}
            </Button>
          </div>
        </form>
      </Form>
    </FormulirContainer>
  );
};

export default SekolahTujuanForm;
