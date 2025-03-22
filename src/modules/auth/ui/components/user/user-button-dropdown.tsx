"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User as UserIcon } from "lucide-react";
import { signOut } from "next-auth/react";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((word) => (word && word[0] ? word[0].toUpperCase() : ""))
    .join("");
}

interface IUserButtonProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}
const UserButtonDropdown = ({ user }: IUserButtonProps) => (
  <DropdownMenu modal={false}>
    <DropdownMenuTrigger className="px-4 py-2 text-sm font-medium  text-slate-100 hover:text-blue-500 border-blue-500/20 rounded-full shadow-none [&_svg]:-size-4">
      <Avatar>
        <AvatarImage
          src={user.image ?? "https://github.com/shadcn.png"}
          sizes="9"
        />
        <AvatarFallback className="text-sm bg-slate-500 text-white">
          {getInitials(user.name ?? user.email ?? "Guest")}
        </AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="">
      <DropdownMenuLabel>
        {user.name ?? user.email ?? "Unknown"}
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem className="flex items-center gap-x-2 hover:cursor-pointer">
          <UserIcon size={9} />
          <span>Profile</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem
          className="flex items-center gap-x-2 hover:cursor-pointer"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut size={9} />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default UserButtonDropdown;
