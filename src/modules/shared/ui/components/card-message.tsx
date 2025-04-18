import { cn } from "@/lib/utils";

interface CardMessageProps {
  type?: "error" | "warning" | "info";
  message?: string;
  hide?: boolean;
}
const CardMessage = ({
  hide = true,
  type = "error",
  message = "Ada kesalahan, silakan periksa kembali data yang Anda masukkan.",
}: CardMessageProps) => {
  return (
    // className base  on type
    <div
      className={cn(
        type === "error" &&
          "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative",
        type === "warning" &&
          "bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative",
        type === "info" &&
          "bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative",
        "flex flex-col gap-2",
        hide && "hidden"
      )}
    >
      <p>
        <span className="font-semibold">{message}</span>
      </p>
    </div>
  );
};

export default CardMessage;
