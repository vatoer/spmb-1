import { auth } from "@/modules/auth/auth";
import Image from "next/image";

export default async function UserAvatar() {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <div>
      <Image
        src={session.user.image ?? "/avatar.svg"}
        alt="User Avatar"
        width={32}
        height={32}
      />
    </div>
  );
}
