"use client";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import { Room } from "@/db/schema";
import {
  Call,
  CallControls,
  CallParticipantsList,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;

export function DevFinderVideo({ room }: { room: Room }) {
  const session = useSession();
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);
  const router = useRouter();
  
  // Use a ref to track if we're already connected
  const isConnectedRef = useRef(false);

  useEffect(() => {
    // Only proceed if we have room and session data
    if (!room || !session.data || !session.data.user.id) return;
    
    // Prevent duplicate connections
    if (isConnectedRef.current) return;
    
    let isMounted = true;
    const connectToCall = async () => {
      try {
        // Mark as connected before actually connecting to prevent race conditions
        isConnectedRef.current = true;
        
        const userId = session.data.user.id;
        const newClient = new StreamVideoClient({
          apiKey,
          user: {
            id: userId,
            name: session.data.user.name ?? undefined,
            image: session.data.user.image ?? undefined,
          },
          tokenProvider: async () => {
            const res = await fetch("/api/stream/token");
            const data = await res.json();
            return data.token;
          },
        });
        
        const newCall = newClient.call("default", room.id);
        await newCall.join({ create: true });
        
        // Only update state if component is still mounted
        if (isMounted) {
          setClient(newClient);
          setCall(newCall);
        } else {
          // Clean up if component unmounted during async operation
          await newCall.leave();
          await newClient.disconnectUser();
        }
      } catch (error) {
        console.error("Error connecting to call:", error);
        isConnectedRef.current = false;
      }
    };
    
    connectToCall();
    
    // Cleanup function
    return () => {
      isMounted = false;
      
      const disconnect = async () => {
        if (call && client) {
          try {
            isConnectedRef.current = false;
            await call.leave();
            await client.disconnectUser();
          } catch (error) {
            console.error("Error during cleanup:", error);
          }
        }
      };
      
      disconnect();
    };
  }, [session.data, room]);

  return (
    client &&
    call && (
      <StreamVideo client={client}>
        <StreamTheme>
          <StreamCall call={call}>
            <SpeakerLayout />
            <CallControls
              onLeave={() => {
                router.push("/browse-room");
              }}
            />
            <CallParticipantsList onClose={() => undefined} />
          </StreamCall>
        </StreamTheme>
      </StreamVideo>
    )
  );
}