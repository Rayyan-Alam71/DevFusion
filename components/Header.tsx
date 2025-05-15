"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "./ui/button"
import { ModeToggle } from "./mode-toggle"
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,DropdownMenu } from "./ui/dropdown-menu"
import { LogOut } from "lucide-react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import Link from "next/link"
function AccountComponent(){
    const session = useSession()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"link"}><AvatarDemo imageSrc={session.data?.user.image!}/>{session.data?.user.name}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem >
                    <Button className="gap-2 flex items-center justify-between" onClick={()=>signOut({
                        callbackUrl : "/"
                    })}>
                        <LogOut/>
                        Sign Out</Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
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
        <header className="container mx-auto dark:bg-gray-800 py-6  bg-slate-100 ">
            <div className="flex justify-between items-center px-4">
                <Link href={"/"}>
                <div className="font-medium text-xl ">
                    LOGO
                </div>
                </Link>
                <div className="flex items-center  gap-4">
                    {session.data?.user && <AccountComponent/>}

                    {!session.data?.user && <Button onClick={()=>signIn()}>Sign In</Button>}
                    
                    <ModeToggle/>
                </div>
            </div>
        </header>
    )
}