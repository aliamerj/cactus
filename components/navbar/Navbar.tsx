import Link from "next/link"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { GiCactusPot } from "react-icons/gi";
import { auth } from "@/auth";
import UserAvatar from "../avatar/UserAvatar";
export const Navbar = async () => {
  const session = await auth();

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6 z-50">
      <nav className="flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <GiCactusPot className="h-14 w-16" />
          <h1 className="text-4xl">кактус</h1>
        </Link>
      </nav>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        {session?.user ? <UserAvatar session={session} /> :
          <Button asChild size='lg'>
            <Link href={"/login"}>Login</Link>
          </Button>
        }
      </div>
    </header>
  )
}
