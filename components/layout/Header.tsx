import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, User, Settings, LogInIcon } from "lucide-react";
import LogoutButton from "../button/LogoutButton";
import getTokenData from "@/lib/utils/getTokenData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { memo } from "react";
import SettingsButton from "../button/SettingsButton";

const Header = async () => {
  const userData = await getTokenData();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="pl-4 pr-3">
        <div className="flex h-14 items-center ">
          <div className="flex flex-1 items-center space-x-16">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/assets/icons/books.svg"
                alt="Readify logo"
                width={24}
                height={24}
                className="h-6 w-6"
              />
              <span className="font-bold text-base">Readify</span>
            </Link>
            <nav className="hidden sm:flex items-center space-x-6">
              <Link href="/articles" className="text-sm font-medium transition-colors hover:text-primary">
                Articles
              </Link>
              <Link href="/categories" className="text-sm font-medium transition-colors hover:text-primary">
                Categories
              </Link>
              <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
                About
              </Link>
            </nav>
          </div>
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  {userData && userData.image ? (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={userData.image} alt="Profile" />
                      <AvatarFallback>
                        U
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/articles" className="w-full sm:hidden">
                    Articles
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/categories" className="w-full sm:hidden">
                    Categories
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/about" className="w-full sm:hidden">
                    About
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="sm:hidden" />
                {userData ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="w-full">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <SettingsButton />
                    <DropdownMenuSeparator />
                    <LogoutButton />
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/login" className="w-full">
                        <LogInIcon className="mr-2 h-4 w-4" />
                        <span>Login</span>
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);