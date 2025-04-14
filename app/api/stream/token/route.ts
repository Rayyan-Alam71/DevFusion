import { generateToken } from "@/app/rooms/[roomId]/helper";
import { getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req : NextRequest){
    const session = await  getSession()
    const  userId = session?.user.id !;
    const token = await generateToken(userId);
    return NextResponse.json({
        token
    })
}