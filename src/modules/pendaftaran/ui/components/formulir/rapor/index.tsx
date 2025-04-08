"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { simpanRapor } from "@/modules/pendaftaran/actions/rapor";
import FormulirContainer from "@/modules/pendaftaran/ui/components/formulir/formulir-container";
import { Rapor, raporSchema } from "@/zod/schemas/rapor/rapor";
import { zodResolver } from "@hookform/resolvers/zod";
import { MataPelajaran } from "@prisma-db-spmb/client";
import { Control, FieldErrors, useForm, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
// const mataPelajaran = Object.values(MataPelajaran);

interface RaporFormProps {
  calonMuridId: string;
  mataPelajaran: MataPelajaran[];
}

interface RaporFormExtProps {
  form: UseFormReturn<Rapor>;
  mataPelajaran: MataPelajaran[];
}

export const RaporForm = ({ calonMuridId, mataPelajaran }: RaporFormProps) => {
  const form = useForm<Rapor>({
    resolver: zodResolver(raporSchema),
    defaultValues: {
      semesters: Array.from({ length: 6 }, (_, i) => ({
        semester: i + 1,
        nilai: mataPelajaran.map((mapel) => ({
          mataPelajaran: mapel.id,
          nilai: 0,
        })),
      })),
    },
  });

  const { handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = async (data: Rapor) => {
    const response = await simpanRapor(calonMuridId, data);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
    console.log(data);
  };

  return (
    <FormulirContainer title="Data Rapor">
      <Form {...form}>
        <form
          className="w-full space-y-2 pb-24"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Shared Fields */}
          <div className="hidden md:block">
            <RaporFormWebFields form={form} mataPelajaran={mataPelajaran} />
          </div>
          <div className="">
            <RaporFormMobileFields form={form} mataPelajaran={mataPelajaran} />
          </div>

          <Button
            type="submit"
            size={"lg"}
            className="hover:cursor-pointer w-full sm:w-1/2 md:w-1/3"
          >
            Simpan Rapor
          </Button>
        </form>
      </Form>
    </FormulirContainer>
  );
};

export const RaporFormWebFields = ({
  mataPelajaran,
  form,
}: RaporFormExtProps) => {
  return (
    <div className="flex flex-col items-center border border-gray-200 p-0">
      <div className="w-full border-gray-200 flex items-center justify-center p-2">
        <span className="font-semibold">Semester</span>
      </div>
      <div className="flex flex-row gap-0 w-full border-collapse">
        <div className="border border-gray-200 flex items-center justify-start w-1/3 p-2">
          <span className="font-semibold">Mata Pelajaran</span>
        </div>
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="border border-gray-200 flex-1 flex justify-center items-center"
          >
            <span>{i + 1}</span>
          </div>
        ))}
      </div>

      {mataPelajaran.map((mapel, i) => (
        <div key={i} className="flex flex-row gap-0 w-full border-collapse">
          <div className="border border-gray-200 flex items-center justify-start w-1/3 p-2">
            <span>{mapel.nama}</span>
          </div>
          {Array.from({ length: 6 }, (_, j) => (
            <div key={i + "s" + j} className="border border-gray-200 flex-1">
              <FormField
                control={form.control}
                name={`semesters.${j}.nilai.${i}.nilai`}
                render={({ field }) => (
                  <FormItem className="h-full">
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        max={100}
                        placeholder="0"
                        {...field}
                        value={
                          field.value === undefined || isNaN(field.value)
                            ? ""
                            : field.value
                        }
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === "" ? "" : Number(e.target.value)
                          )
                        }
                        className="bg-background min-h-18 h-full border-none outline-none ring-0 rounded-none text-center focus-visible:ring-1 placeholder:text-muted-foreground"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export const RaporFormMobileFields = ({
  mataPelajaran,
  form,
}: RaporFormExtProps) => {
  return (
    <>
      {Array.from({ length: 6 }, (_, i) => (
        <Semester
          semester={i + 1}
          mataPelajaran={mataPelajaran}
          key={i}
          control={form.control}
        />
      ))}
    </>
  );
};

interface SemesterProps {
  semester: number;
  mataPelajaran: MataPelajaran[];
  control: Control<Rapor>;
}
const Semester = ({ semester, mataPelajaran, control }: SemesterProps) => {
  return (
    <div className="flex flex-col items-center border border-gray-200 p-0">
      <div className="w-full border-gray-200 bg-gray-300 flex items-center justify-center">
        <span className="font-semibold p-2">Semester {semester}</span>
      </div>
      {mataPelajaran.map((mapel, i) => (
        <div
          key={i}
          className="flex flex-row gap-0 w-full border-collapse justify-stretch"
        >
          <div className="border border-gray-200  w-2/3  flex items-center justify-start p-2">
            {mapel.nama}
          </div>
          <div className="border border-gray-200 w-1/3">
            <FormField
              control={control}
              name={`semesters.${semester}.nilai.${i}.nilai`}
              render={({ field }) => (
                <FormItem className="h-full">
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      placeholder="0"
                      {...field}
                      value={
                        field.value === undefined || isNaN(field.value)
                          ? ""
                          : field.value
                      }
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === "" ? "" : Number(e.target.value)
                        )
                      }
                      className="bg-background min-h-18 h-full border-none outline-none ring-0 rounded-none text-center focus-visible:ring-1 placeholder:text-muted-foreground"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

interface ErrorDisplayProps {
  errors: FieldErrors;
}

export const ErrorDisplay = ({ errors }: ErrorDisplayProps) => {
  const collectErrors = (errors: FieldErrors, parentKey = ""): string[] => {
    const messages: string[] = [];

    for (const key in errors) {
      const error = errors[key];

      if (!error) continue;

      const path = parentKey ? `${parentKey}.${key}` : key;

      if ("message" in error && error.message) {
        messages.push(String(error.message));
      }

      if ("types" in error && typeof error.types === "object") {
        messages.push(...Object.values(error.types).map(String));
      }

      if (typeof error === "object" && !Array.isArray(error)) {
        messages.push(...collectErrors(error as FieldErrors, path));
      }

      if (Array.isArray(error)) {
        error.forEach((item, index) => {
          if (item) {
            messages.push(...collectErrors(item, `${path}[${index}]`));
          }
        });
      }
    }

    return messages;
  };

  const messages = collectErrors(errors);

  if (messages.length === 0) return null;

  return (
    <ul className="mt-2 text-sm text-red-500 list-disc list-inside space-y-1">
      {messages.map((msg, idx) => (
        <li key={idx}>{msg}</li>
      ))}
    </ul>
  );
};

export default RaporForm;
