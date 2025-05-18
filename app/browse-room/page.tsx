import { SearchBar } from "@/components/SearchBar";
import { splitTags, TagList } from "@/components/TagList";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Room } from "@/db/schema";
import { getRooms } from "@/services/rooms";
import { Github } from "lucide-react";
import { unstable_noStore } from "next/cache";
import Link from "next/link";



export default async function Page({ searchParams }: { searchParams: Promise<{ search?: string }> }) {
  unstable_noStore()
  const searchMediator = await searchParams;
  const searchQuery: string = searchMediator.search ||  '';
  // While in production, nextJs will treat this as static and will not fetch rooms every time. 
  // run 'npm run build' => this will show whether this is static or dynamic.
  // https://nextjs.org/docs/app/api-reference/functions/connection
  // https://nextjs.org/docs/app/api-reference/functions/unstable_noStore
  console.log(searchQuery)
  const rooms = await getRooms(searchQuery);
  return (
    <div>
      <div className="flex justify-between px-16 pt-16 w-full">

        <div className="flex flex-col md:flex-row md:justify-between gap-2 md:gap-0 w-full">
          <div className="flex flex-col space-y-2">
            <div className="text-lg md:text-4xl">
            Find Your Perfect Dev Room
            </div>
            <div className="">
              <SearchBar/>
            </div>  
            {
              searchQuery != '' && <div> <Button asChild>
                <Link href={"/browse-room"}>Clear Filter</Link>
                </Button></div>
            }
          </div>
          <Button asChild>
          <Link href={"/create-room"}>Create Room</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-2 sm:px-6 md:px-14 pt-8 sm:pt-16 pb-8">
        {rooms.reverse().map((room) => (
          <div
            key={room.id}
            className="flex justify-center items-stretch"
          >
            <RoomCardDisplay roomData={room} />
          </div>
        ))}
      </div>

    </div>
  );
}

function RoomCardDisplay({ roomData }: { roomData: Room }) {
  return (
    <Card className="w-full max-w-[320px] min-w-[200px] mx-auto overflow-hidden shadow-md rounded-lg text-sm sm:text-base">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl pb-2 break-words">{roomData.name}</CardTitle>
        <CardDescription className="px-2 pt-2 pb-4 break-words">{roomData.description}</CardDescription>
      </CardHeader>
      <div className="flex items-center justify-center flex-wrap gap-2 px-2">
        <TagList languages={splitTags(roomData.language!)} />
      </div>
      <div className="flex flex-col sm:flex-row justify-between px-2 flex-wrap items-center gap-2">
        {roomData.GithubRepo && (
          <CardContent>
            <p className="flex items-center text-xs sm:text-sm">
              <Github className="mr-2" size={16} />
              <Link href={`${roomData.GithubRepo}`} legacyBehavior>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  className="border-b border-gray-500 hover:border-black"
                >
                  GitHub
                </a>
              </Link>
            </p>
          </CardContent>
        )}
        <CardFooter>
          <Button size="sm" className="w-full sm:w-auto">
            <Link href={`rooms/${roomData.id}`}>Join Room</Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

