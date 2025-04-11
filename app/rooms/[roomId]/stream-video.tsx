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
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const apiKey = "9v9m6sffpvjf";

const generateTokenAction =()=>{
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZDY0NWUxY2ItYmUxYi00ZGY3LTlhNmQtNDI1MzZjNWY5M2IwIn0.F0K_-58LPuIBwKu34quvI9rO1Pfs9ieWM-_ghrEW2KA";
    return token;
}

export function DevFinderVideo({ room }: { room: Room }) {
  const session = useSession();
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!room) {
        alert("invalid room found");
        return;
    }
    if (!session.data) {
        alert("user not authenticated")
        return;
    }
    const userId = session.data.user.id !;
    // @ts-ignore
    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: userId,
        name: session.data.user.name ?? undefined,
        image: session.data.user.image ?? undefined,
      },
      tokenProvider: () => generateTokenAction(),
    });
    const call = client.call("default", room.id);
    call.join({ create: true });
    setClient(client);
    setCall(call);

    return () => {
      call
        .leave()
        .then(() => client.disconnectUser())
        .catch(console.error);
    };
  }, [session, room]);

  return (
    client &&
    call && (
      <StreamVideo client={client}>
        <StreamTheme>
          <StreamCall call={call}>
            <SpeakerLayout />
            <CallControls
              onLeave={() => {
                router.push("/");
              }}
            />
            <CallParticipantsList onClose={() => undefined} />
          </StreamCall>
        </StreamTheme>
      </StreamVideo>
    )
  );
}