"use client"
import { deleteRoom } from "@/app/my-room/actions"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Router, Trash } from "lucide-react"
import { useRouter } from "next/navigation"

import React from 'react'

const AlertBox = (roomId : any) => {
    const router = useRouter(); 
  return(
        <AlertDialog>
            <AlertDialogTrigger className='bg-red-500 p-2 rounded-lg font-serif cursor:pointer flex items-center '><Trash className="h-5 w-4 mr-1"/>Delete</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanenlty delete this room.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={()=>{
                    deleteRoom(roomId)
                    router.push("/my-room")
                    }}>Yes, delete it</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default AlertBox
