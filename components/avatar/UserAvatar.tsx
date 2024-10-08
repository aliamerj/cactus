import { signOut } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { CircleUser } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Session } from "next-auth";
import Link from "next/link";
export default async function UserAvatar({
  session,
}: {
  session: Session
}) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-7 w-7">
          <AvatarImage
            src={session?.user?.image ?? undefined}
            alt="@shadcn"
          />
          <AvatarFallback>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-12 w-12" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/my_posts"> My Posts</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <DropdownMenuItem asChild>
            <Button className="w-full" variant="ghost" type="submit">
              Logout
            </Button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
