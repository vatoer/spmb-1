"use client";
import { Progress } from "@/components/form/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { createId } from "@paralleldrive/cuid2";
import axios from "axios";
import { useRef, useState } from "react";
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { toast } from "sonner";

interface FormFileImmediateUploadProps {
  name: string;
  cuid?: string;
  onFileChange?: (
    file: File | null,
    field: ControllerRenderProps<FieldValues, string>
  ) => void;
  className?: string;
  allowedTypes?: string[];
  placeholder?: string;
  onFileUploadComplete?: (name: string, file?: File | null) => void;
  additionalData?: Record<string, string>;
  endpoint?: string;

  //ref?: React.RefObject<HTMLInputElement>;
}

export const FormFileImmediateUpload = ({
  name,
  cuid = createId(),
  onFileChange,
  onFileUploadComplete = () => {},
  className,
  allowedTypes = ["application/pdf"],
  placeholder = "No file selected, please choose a file",
  additionalData,
  endpoint = "/api/upload",
}: //ref,
FormFileImmediateUploadProps) => {
  const { control, watch } = useFormContext();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [percentCompleted, setPercentCompleted] = useState(0);

  // useEffect(() => {
  //   setPercentCompleted(0);
  // }, []);

  // Watch the field value to display previously saved file
  const currentFile = watch(name) as File | undefined;

  const clearFile = (field: ControllerRenderProps<FieldValues, string>) => {
    field.onChange(null);
    onFileChange?.(null, field); // update the parent component
    setPercentCompleted(0);
    if (inputRef.current) {
      inputRef.current.value = ""; // Clear the file input
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<FieldValues, string>
  ) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleImmediateUpload(selectedFile, field);
      field.onChange(selectedFile);
      onFileChange?.(selectedFile, field); // update the parent component
    }
  };

  const handleImmediateUpload = async (
    file: File,
    field: ControllerRenderProps<FieldValues, string>
  ) => {
    setPercentCompleted(0);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("cuid", cuid);

    // Append additional data if provided
    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }

    try {
      const response = await axios.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setPercentCompleted(percentCompleted);
            console.log(`File is ${percentCompleted}% uploaded.`);
            // You can update your UI here (e.g., progress bar)
          } else {
            console.log(
              "Unable to compute progress information since the total size is unknown."
            );
          }
        },
      });

      if (response.status === 200) {
        // toast.info(`File ${file.name} uploaded successfully:`);
        onFileUploadComplete(name, file);
        // Update the UI to reflect the successful upload
      } else {
        toast.error(`File upload failed with status:, ${response.status}`);
        // Handle the error (e.g., display a message to the user)
      }

      console.log("File uploaded successfully:", response.data);
    } catch (error) {
      clearFile(field); // Clear the file input

      if (axios.isAxiosError(error)) {
        // Axios-specific error handling
        if (error.response) {
          // Server responded with a status other than 200 range
          console.log(
            "Server error:",
            error.response.status,
            error.response.data
          );
          toast.error(
            `Failed to upload ${file.name} Server error: ${error.response.status}`
          );
        } else if (error.request) {
          // Request was made but no response was received
          console.log("Network error:", error.request);
          toast.error("Network error: No response received from server");
        } else {
          // Something happened in setting up the request
          console.log("Error setting up request:", error.message);
          toast.error(`Error setting up request: ${error.message}`);
        }
      } else {
        // Non-Axios error
        console.log("Unexpected error:", error);
        toast.error("Unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <div className="flex flex-row gap-1">
              <div className="flex w-full flex-col">
                <Input
                  name={`fki-${name}`}
                  type="text"
                  readOnly
                  value={currentFile?.name ?? ""}
                  placeholder={placeholder}
                  onClick={() =>
                    !currentFile ? inputRef.current?.click() : null
                  }
                />
                <Progress
                  value={percentCompleted}
                  className="w-full h-[3px] rounded-sm -mt-[3px]"
                  indicatorClassName="bg-slate-400"
                />
              </div>

              <Button
                variant={"outline"}
                type="button"
                onClick={() => inputRef.current?.click()}
              >
                {currentFile ? "Change" : "Browse File"}
              </Button>
              <Button
                variant={"outline"}
                type="button"
                onClick={() => {
                  clearFile(field); // Clear the file input
                }}
              >
                clear
              </Button>
            </div>

            <input
              ref={inputRef}
              id={name}
              type="file"
              accept={allowedTypes.join(", ")}
              className={cn(
                "border-2 border-gray-300 p-2 rounded w-full hidden",
                className
                // currentFile && "hidden"
              )}
              onChange={(e) => handleChange(e, field)}
            />
          </>
        )}
      />
    </div>
  );
};

export default FormFileImmediateUpload;
