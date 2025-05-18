"use server"
import { getSession } from "@/lib/auth";
import { StreamChat } from "stream-chat";

const api_key = process.env.NEXT_PUBLIC_STREAM_API_KEY !;
const api_secret = process.env.GET_STREAM_SECRET ! ;
if(!api_key || !api_secret) console.log("secrets not found");

export const generateToken = async (userId : string) => {
    const user_id = userId !;
    // Initialize a Server Client
    const serverClient = StreamChat.getInstance(api_key, api_secret);
    // Create User Token
    const token = serverClient.createToken(user_id);
    return token;
}

export async function generateTokenAction() {
  const session = await getSession();

  if (!session) {
    throw new Error("No session found");
  }

  const api_key = process.env.NEXT_SECRET_STREAM_API_KEY!;
  const api_secret = process.env.GET_STREAM_SECRET!;
  const serverClient = StreamChat.getInstance(api_key, api_secret);
  const token = serverClient.createToken(session.user.id);
  console.log("token", token);
  return token;
}