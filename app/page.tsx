import { Button } from "@/components/ui/button";
import { getRooms } from "@/services/rooms";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Room } from "@/db/schema";
import { Github } from "lucide-react";


export default async function Home() {
  // While in production, nextJs will treat this as static and will not fetch rooms every time. 
  // run 'npm run build' => this will show whether this is static or dynamic.
  // https://nextjs.org/docs/app/api-reference/functions/connection
  // https://nextjs.org/docs/app/api-reference/functions/unstable_noStore

  // const createdRooms = await db.query.room.findMany();

  const rooms = await getRooms();
  return (
    <div>
      <div className="flex justify-between px-16 pt-16 w-full">

        <div className="text-4xl">
          Find Your Perfect Dev Room
        </div>
        <Button asChild>
        <Link href={"/create-room"}> Create Room</Link>
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-5 px-14 pt-20">
        {rooms.map((room)=>(
            <div key={room.id} className="mr-2 mt-2"><RoomCardDisplay roomData={room}/></div>
        ))}
      </div>

    </div>
      // {/* {rooms.map((room)=>(
      //   <div key={room.id}><RoomCardDisplay roomData={room}/></div>
      // ))} */}
  );
}

function RoomCardDisplay({roomData}: {roomData : Room}){
  return (
      <Card>
        <CardHeader>
          <CardTitle>{roomData.name}</CardTitle>
          <CardDescription>{roomData.description}</CardDescription>
        </CardHeader>
        <CardContent >
          <p className="flex items-center"><Github className="mr-2"/> {roomData.GithubRepo}</p>
        </CardContent>
        <CardFooter>
          <Button><Link href={`rooms/${roomData.id}`}>Join Room</Link></Button>
        </CardFooter>
    </Card>
  )
}
