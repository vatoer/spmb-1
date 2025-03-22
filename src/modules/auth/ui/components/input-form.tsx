import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface InputFormProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  type?: string;
  register: UseFormRegister<T>;
  error?: FieldError | undefined;
  pattern?: string;
}

const InputForm = <T extends FieldValues>({
  id,
  label,
  type = "text",
  register,
  error,
}: InputFormProps<T>) => {
  return (
    <div className="relative group w-full">
      <input
        id={id}
        type={type}
        {...register(id)}
        required
        autoComplete="off"
        className="form-control block w-full h-[4em] px-4 py-5 text-sm font-normal text-gray-700 bg-white border border-gray-300 rounded-sm  m-0 focus:text-gray-700 focus:bg-white focus:border-blue-500 focus:outline-none peer"
      />
      <label
        htmlFor={id}
        className="transform transition-all absolute top-4 ml-4 text-muted-foreground
        peer-valid:-top-3 peer-valid:text-sm 
        group-focus-within:-top-3 group-focus-within:text-sm
        group-focus-within:text-blue-500 peer-valid:bg-white 
        group-focus-within:bg-white
        peer-valid:px-2 group-focus-within:px-2 rounded-sm
        "
      >
        {label}
      </label>
      {error && (
        <span className="text-red-500 w-[250px] overflow-auto whitespace-normal flex-shrink-0 break-words block">
          {error.message}
        </span>
      )}
    </div>
  );
};

export default InputForm;
