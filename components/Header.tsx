"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "./ui/button"
import { ModeToggle } from "./mode-toggle"

export function Header(){
    const session = useSession()

    return (
        <header>
            <div>
                {session.data?.user ? <Button onClick={()=>signOut()}>Sign Out</Button> : 
                    <Button onClick={()=> signIn()}>Sign In</Button>
                }
                {session.data?.user?.name !}
                
                <ModeToggle/>
            </div>
        </header>
    )
}