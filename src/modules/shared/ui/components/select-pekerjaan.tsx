"use client";

import { getOptionsPekerjaan } from "@/actions/common/pekerjaan";
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
  onChange?: (
    value: string | SingleValue<Option>,
    { action }: { action?: string }
  ) => void;
}

export const SelectPekerjaan = ({ ...props }: SelectProps) => {
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    // fetch new options
    const fetchOptions = async () => {
      const response = await getOptionsPekerjaan();
      // check if kotaKabupaten is a string or an object
      setOptions(response);
    };
    fetchOptions();
  }, []);

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

export default SelectPekerjaan;
