"use server"
import { db } from "@/db";
import { room } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function getUserRooms() {
  const session = await getSession();
  if (!session) {
    throw new Error("User not authenticated");
  }
  const rooms = await db.query.room.findMany({
    where: eq(room.userId, session.user.id),
  });

  return rooms;
}

export async function deleteRoom(roomId : any){
  const session = await getSession();
  if(!session){
    throw new Error("user not validated");
  }
  const roomIdToBeDeleted = roomId.roomId;
  await db.delete(room).where(eq(room.id, roomIdToBeDeleted))
}