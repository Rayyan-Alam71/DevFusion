"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "./ui/button"
import { ModeToggle } from "./mode-toggle"
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,DropdownMenu } from "./ui/dropdown-menu"
import { LogOut, Router } from "lucide-react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import logo from "../public/devfusion-logo.svg"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Home, Inbox, Search, Settings, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useRouter } from "next/navigation"

function AccountComponent(){
    const session = useSession()
    return (
        <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"link"}><AvatarDemo imageSrc={session.data?.user.image!}/><p className="hidden md:block text-md">{session.data?.user.name}</p></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem className="visible md:hidden text-sm">{session.data?.user.name}</DropdownMenuItem>
                <DropdownMenuItem >
                    <Button className="gap-2 flex items-center justify-between" onClick={()=>signOut({
                        callbackUrl : "/"
                    })}>
                        <LogOut/>
                        Sign Out</Button>
                </DropdownMenuItem>
                <DropdownMenuItem className="visible md:hidden"><ModeToggle/></DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </>
    )

}


 
function AvatarDemo({imageSrc} : {imageSrc:string}) {
    return (
        <Avatar>
        <AvatarImage src={imageSrc} alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    )
}

export function Header(){
    const session = useSession()
    return (
        <header className="container mx-auto dark:bg-gray-800 py-6 bg-slate-100 ">
            <div className="flex justify-between items-center px-4 sm:px-8">
                <Link href={"/"} className="flex flex-col md:flex-row items-center gap-2">
                        <div className="w-7 h-7 md:w-12 md:h-12  fill relative">
                            <Image
                            src={logo}
                            width={60}
                            height={45}
                            alt="DevFusion-logo"
                            />
                        </div>
                            <p className="text-md sm:text-md md:text-xl font-mono font-bold">DevFusion</p>
                </Link>
                {/* Desktop Navigation */}
                {session.data?.user && (
                    <div className="hidden md:flex gap-6 items-center">
                        <Link href={"/browse-room"}>
                            <div className="hover:underline text-sm md:text-xl">
                                Browse Rooms
                            </div>
                        </Link>
                        <Link href={"/my-room"}>
                            <div className="hover:underline text-sm md:text-xl ">
                                My Rooms
                            </div>
                        </Link>
                    </div>
                )}
                {/* Mobile Side Navigation */}
                {session.data?.user ? (
                    <div className="md:hidden flex items-center">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="mr-2">
                                    <Menu className="w-6 h-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-56 flex flex-col gap-4 pt-8">
                                <h3 className="text-lg font-semibold mx-auto">Hello {session.data.user.name}</h3>
                                <Link href="/" className="text-md font-medium py-2 px-4 hover:underline">Home</Link>
                                <Link href="/browse-room" className="text-md font-medium  px-4 hover:underline">Browse Rooms</Link>
                                <Link href="/my-room" className="text-md font-medium py-2 px-4 hover:underline">My Rooms</Link>
                                <div className="py-2">
                                    <Button variant="outline" className="w-3/4 px-2 mx-auto  flex gap-2 items-center justify-center" onClick={() => signOut({ callbackUrl: "/" })}>
                                        <LogOut className="w-4 h-4" /> Sign Out
                                    </Button>
                                </div>
                                <div className="py-2 flex justify-center">
                                    <ModeToggle />
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                ):(
                    <Button className="md:hidden" onClick={()=>signIn()}>Sign In</Button>
                )}
                <div className="hidden md:block">
                    <div className="flex items-center gap-4">
                        {session.data?.user && <AccountComponent/>}
                        {!session.data?.user && <Button onClick={()=>signIn()}>Sign In</Button>}
                        <div className="hidden md:block"><ModeToggle/></div>
                    </div>
                </div>
            </div>
        </header>
    )
}