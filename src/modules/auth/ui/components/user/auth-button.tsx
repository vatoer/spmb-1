import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { auth } from "@/modules/auth/auth";
import UserButtonDropdown from "@/modules/auth/ui/components/user/user-button-dropdown";
import { UserCircleIcon } from "lucide-react";
import Link from "next/link";

export const AuthButton = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return <AuthButton.Login />;
  }

  return <UserButtonDropdown user={user} />;
};

AuthButton.Login = function AuthButtonLogin() {
  return (
    <Link href="/login" className="w-full">
      <Button
        variant={"outline"}
        className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500 border-blue-500/20 rounded-full shadow-none [&_svg]:-size-4"
      >
        <UserCircleIcon />
        <span className="">Login</span>
      </Button>
    </Link>
  );
};

AuthButton.Skeleton = function AuthButtonSkeleton() {
  return (
    <div className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500 border-blue-500/20 rounded-full shadow-none [&_svg]:-size-4">
      <Skeleton className="w-9 h-9 rounded-full" />
    </div>
  );
};

export default AuthButton;
