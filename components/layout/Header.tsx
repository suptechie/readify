'use client'

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, User, Settings, LogOut } from "lucide-react"

const Header = () => {
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
                  <Menu className="h-5 w-5" />
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
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="w-full">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header