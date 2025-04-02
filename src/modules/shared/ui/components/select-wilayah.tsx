"use client";

import { getOptionsWilayahAdministratif } from "@/actions/wilayah-administratif";
import SelectSingle from "@/modules/shared/ui/components/select-single";
import { useEffect, useState } from "react";
import { SingleValue } from "react-select";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  isDisabled?: boolean;
  inputId?: string;
  value?: string | SingleValue<Option>;
  onChange?: (value: string | SingleValue<Option>) => void;
  induk?: string | SingleValue<Option>;
  tingkat: number;
}

export const SelectWilayah = ({
  induk,
  tingkat = 99,
  ...props
}: SelectProps) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [stackedOptions, setStackedOptions] = useState<Option[][]>([]);

  useEffect(() => {
    let indukId: string | null = null;
    // save options before fetching new options and stack them
    setStackedOptions([...stackedOptions, options]);
    // fetch new options
    const fetchOptions = async () => {
      // check if kotaKabupaten is a string or an object
      if (induk) {
        if (typeof induk === "object") {
          indukId = induk.value;
        } else {
          indukId = induk;
        }
      }
      // only allow indukId to be null if tingkat is 1
      if (tingkat === 1) {
        indukId = null;
      } else if (!indukId) {
        indukId = "N/A";
      }
      const response = await getOptionsWilayahAdministratif(indukId);
      setOptions(response);
    };
    fetchOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [induk]);

  return (
    <SelectSingle
      {...props}
      inputId={props.inputId}
      options={options}
      classNames={customSelectStyles}
    />
  );
};

const customSelectStyles = {
  control: ({ isFocused }: { isFocused: boolean }) =>
    `h-12 border !border-input rounded-md px-1 transition-all ${
      isFocused
        ? "!ring-1 !ring-ring focus-visible:!outline-none" // Override default styles
        : "border-gray-300 ring-transparent"
    }`,
};

// const customSelectStyles2 = {
//   control: ({ isFocused }: { isFocused: boolean }) =>
//     `w-full border rounded-lg px-3 py-2 h-12 transition-all ${
//       isFocused
//         ? "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
//         : ""
//     }`,
//   dropdownIndicator: ({ isFocused }: { isFocused: boolean }) =>
//     `transition-colors ${isFocused ? "text-blue-500" : "text-gray-500"}`,
// };

export default SelectWilayah;
