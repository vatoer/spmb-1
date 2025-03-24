import SideLink from "@/modules/pendaftaran/ui/components/formulir/side-link";

const SideLinks = () => {
  return (
    <div className="flex flex-col gap-4">
      <SideLink href="/formulir/data-pribadi" title="Data Pribadi" />
      <SideLink href="/formulir/data-orang-tua" title="Data Orang Tua" />
      <SideLink href="/formulir/sekolah-asal" title="Sekolah Asal" />
      <SideLink href="/formulir/data-rapor" title="Rapor" />
      <SideLink href="/formulir/sekolah-tujuan" title="Sekolah Tujuan" />
    </div>
  );
};

export default SideLinks;
