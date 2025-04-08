"use client";

import { Button } from "@/components/ui/button";
import { buatPendaftaran } from "@/modules/pendaftaran/actions";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const PendaftaranBaruButton = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const handleClick = async () => {
    setSubmitting(true);
    const response = await buatPendaftaran();
    if (response.success) {
      toast.success("memulai pendaftaran baru");
      router.push(`/formulir/${response.data.id}/data-diri`);
    } else {
      toast.error(
        response.error || "Terjadi kesalahan memuat pendaftaran baru."
      );
    }
    setSubmitting(false);
  };

  return (
    <Button
      className="btn hover:cursor-pointer w-full sm:w-[300px] h-12 text"
      onClick={handleClick}
      disabled={submitting}
      size={"lg"}
      variant="outline"
    >
      Buat Pendaftaran Baru
      {submitting && <Loader className="ml-2 animate-spin" />}
    </Button>
  );
};

export default PendaftaranBaruButton;
