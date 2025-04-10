"use client";
import FormFileImmediateUpload from "@/components/form/form-file-immediate-upload";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import FormulirContainer from "@/modules/pendaftaran/ui/components/formulir/formulir-container";
import CumulativeErrors from "@/modules/shared/ui/components/cumulative-error";
import {
  DokumenPendaftaran,
  dokumenPendaftaranSchema,
  FileDokumenPendaftaranKey,
} from "@/zod/schemas/dokumen/dokumen";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export interface DokumenPendaftaranUploadFields {
  cuid: string;
  key: FileDokumenPendaftaranKey;
  label: string;
  data: {
    identifier: string;
  };
}

interface UnggahDokumenFormProps {
  pendaftaranId: string;
  defaultValuesDokumen: DokumenPendaftaran;
}

export const UnggahDokumenForm = ({
  pendaftaranId,
  defaultValuesDokumen,
}: UnggahDokumenFormProps) => {
  const form = useForm<DokumenPendaftaran>({
    resolver: zodResolver(dokumenPendaftaranSchema),
    defaultValues: defaultValuesDokumen,
  });

  const fileDokumenKeys: DokumenPendaftaranUploadFields[] = [
    {
      cuid: pendaftaranId,
      key: "fileKkCalonMurid",
      label: "File KK Calon Murid",
      data: {
        identifier: "fileKkCalonMurid",
      },
    },
    {
      cuid: pendaftaranId,
      key: "fileKkIbu",
      label: "File KK Ibu",
      data: {
        identifier: "fileKkIbu",
      },
    },
    {
      cuid: pendaftaranId,
      key: "fileKkAyah",
      label: "File KK Ayah",
      data: {
        identifier: "fileKkAyah",
      },
    },
    {
      cuid: pendaftaranId,
      key: "fileRapor",
      label: "File Rapor",
      data: {
        identifier: "fileRapor",
      },
    },
    {
      cuid: pendaftaranId,
      key: "fileSptjm",
      label: "File SPTJM",
      data: {
        identifier: "fileSptjm",
      },
    },
  ];

  const { handleSubmit, formState } = form;
  const { isSubmitting, errors } = formState;

  const handleUploadComplete = (name: string, file?: File | null) => {
    if (!file) return;
    toast.success(`File ${name} berhasil diupload`);
    console.log("File uploaded:", fileDokumenKeys);
  };

  const handleFileChange = (file: File | null) => {
    if (file !== null) {
      const fileUrl = URL.createObjectURL(file);
      console.log(fileUrl);
      //setFileUrl(fileUrl);
    } else {
      //setFileUrl(null);
    }
  };

  const onSubmit = async (data: DokumenPendaftaran) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(data);
        resolve(true);
      }, 2000);
    });
  };

  return (
    <FormulirContainer title="Dokumen Pendaftaran">
      <Form {...form}>
        <form
          className="w-full space-y-2 pb-24"
          onSubmit={handleSubmit(onSubmit)}
        >
          {fileDokumenKeys.map((dokumen) => (
            <FormField
              key={dokumen.key} // Add a unique key for each element
              control={form.control}
              name={dokumen.key}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={dokumen.key}>{dokumen.label}</FormLabel>
                  <FormControl>
                    <FormFileImmediateUpload
                      cuid={dokumen.cuid}
                      name={field.name}
                      onFileChange={handleFileChange}
                      onFileUploadComplete={handleUploadComplete}
                      className="bg-white"
                      additionalData={dokumen.data}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <CumulativeErrors errors={errors} />
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
              <span className="text-sm font-semibold">Simpan Dokumen</span>
              {isSubmitting && <Loader className="animate-spin mr-2 h-4 w-4" />}
            </Button>
          </div>
        </form>
      </Form>
    </FormulirContainer>
  );
};

export default UnggahDokumenForm;
