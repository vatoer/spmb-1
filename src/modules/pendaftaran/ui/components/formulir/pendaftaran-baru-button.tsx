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
      className="btn btn-primary hover:cursor-pointer w-full"
      onClick={handleClick}
      disabled={submitting}
    >
      Isi Formulir Pendaftaran Baru
      {submitting && <Loader className="ml-2 animate-spin" />}
    </Button>
  );
};

export default PendaftaranBaruButton;
