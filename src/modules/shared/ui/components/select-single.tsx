import Select, { ClassNamesConfig, GroupBase, SingleValue } from "react-select";

interface Option {
  value: string;
  label: string;
}

interface SelectProps<T = Option> {
  isDisabled?: boolean;
  inputId?: string;
  options?: T[];
  value?: string | SingleValue<T>;
  onChange?: (value: SingleValue<T>, { action }: { action?: string }) => void; // https://github.com/JedWatson/react-select/issues/1309
  classNames?: ClassNamesConfig<T, false, GroupBase<T>> | undefined;
}

export const SelectSingle = <T extends Option = Option>({
  isDisabled = false,
  inputId,
  options = [],
  value,
  onChange,
  classNames: customSelectStyles,
}: SelectProps<T>) => {
  //generate a random instanceId if not provided

  const instanceId = Math.random().toString(36).substring(7);

  // If value is a string, find the corresponding object in options
  const selectedValue =
    typeof value === "string"
      ? options.find((option) => option.value === value) || null
      : value;
  return (
    <Select
      classNames={customSelectStyles}
      // inputId={inputId}
      aria-labelledby={inputId + "-label"}
      isDisabled={isDisabled}
      instanceId={instanceId}
      options={options}
      value={selectedValue}
      onChange={onChange}
      isClearable={true}
    />
  );
};

export default SelectSingle;
