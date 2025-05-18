import { db } from "@/db";
import { room } from "@/db/schema";
import { eq, ilike, like, or } from "drizzle-orm";
import { unstable_noStore } from "next/cache";

export async function getRooms(searchQuery : any){
    unstable_noStore();
    if(searchQuery === '' || searchQuery === undefined ){
        const rooms = await db.query.room.findMany()
        return rooms;
    }
    else{
        const rooms = await db.query.room.findMany({
            where : or(
                ilike(room.language , `%${searchQuery}%`),
                ilike(room.description , `%${searchQuery}%`),
                ilike(room.name , `%${searchQuery}%`)
            )
            // where : like(room.language && room.name , `%${searchQuery}%`)
        })
        return rooms;
    }
}
export async function getRoomDetail(roomId :any){
    unstable_noStore();
    return await db.query.room.findFirst({
        where: eq(room.id , roomId)
    }) 
}