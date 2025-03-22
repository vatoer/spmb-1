import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const listOfMessages = [
  "Cara mudah mendaftar sekolah secara online",
  "Yuk, temukan cara praktis untuk mendaftar sekolah secara online!",
  "Nikmati kemudahan mendaftar sekolah tanpa harus antri di lokasi pendaftaran",
  "Dengan Sistem Penerimaan Murid Baru online, Anda bisa mendaftar kapan pun dan di mana pun.",
  "Pendaftaran sekolah sekarang lebih mudah dengan Siap SPMB",
  "Dapatkan akses langsung ke formulir pendaftaran tanpa harus datang ke sekolah.",
  "Pendaftaran sekolah sekarang lebih mudah dengan Siap SPMB",
  "Tak perlu lagi ribet bawa berkas-berkas, cukup unggah secara digital!",
  "Jangan lewatkan kesempatan untuk bergabung dengan sekolah impian Anda, daftar sekarang juga secara online!",
  "Manfaatkan fitur-fitur pintar yang disediakan dalam sistem pendaftaran online ini.",
  "Tunggu apa lagi? Segera daftar online dan raih impian pendidikan Anda dengan mudah!",
];

export const CardBanner = () => {
  const randomMessage =
    listOfMessages[Math.floor(Math.random() * listOfMessages.length)];

  return (
    <Card
      className="w-full md:w-[600px] h-[600px] bg-blue-800 text-white bg-cover"
      style={{
        backgroundImage:
          "linear-gradient(rgba(37, 99, 235, 0.7), rgba(37, 99, 235, 0.7)), url('/hero/hero1.jpg')",
      }}
    >
      <CardHeader>
        <CardTitle className="text-6xl">Siap SPMB</CardTitle>
        <CardDescription className="text-white text-3xl">
          {randomMessage}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center h-[300px]"></CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost">Pelajari Lebih Lanjut</Button>
      </CardFooter>
    </Card>
  );
};

export default CardBanner;
