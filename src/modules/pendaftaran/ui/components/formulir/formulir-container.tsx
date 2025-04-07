import { cn } from "@/lib/utils";

interface FormulirContainerProps {
  title?: string;
  children?: React.ReactNode;
  className?: string;
}
const FormulirContainer = ({
  title,
  children,
  className,
}: FormulirContainerProps) => {
  return (
    <div
      className={cn(
        "w-full max-w-3xl px-2 md:p-4 md:border border-gray-200  bg-white rounded-lg",
        className
      )}
    >
      <div className="flex flex-col w-full items-center py-4 md:py-0">
        <h1 className="hidden mb-8 md:block text-2xl md:text-2xl text-center font-semibold">
          {title || "Formulir Pendaftaran"}
        </h1>
        {children}
      </div>
    </div>
  );
};

export default FormulirContainer;
