"use server";

import { db } from "@/db";
import { Room, room } from "@/db/schema";
import { getSession } from "@/lib/auth";

export async function CreateRoomAction(roomData : Omit<Room, "userId">){
    //  insert the room details of the user in the db
    const session = await getSession();
    if(!session ){
        throw new Error("user not found / validated")
    }
    await db.insert(room).values({...roomData, userId : session.user.id})
}
