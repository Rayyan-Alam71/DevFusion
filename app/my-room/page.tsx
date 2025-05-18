import { splitTags, TagList } from '@/components/TagList'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Room } from '@/db/schema'
import { Github } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { deleteRoom, getUserRooms } from './actions'
import AlertBox from '@/components/Alert-box'
import noDataIcon from "../../public/no-data-found.jpg"
import Image from 'next/image'

const page = async () => {
  const rooms = await getUserRooms();
  return (
    <div className='min-h-[85vh] h-auto'>
      <div className="flex flex-col sm:flex-row justify-between px-4 sm:px-8 md:px-16 pt-8 sm:pt-12 md:pt-16 w-full gap-4 sm:gap-0">
        <div className="flex flex-col space-y-2">
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Browse through your rooms
          </div>
        </div>
        <Button asChild className="w-full sm:w-auto text-base sm:text-lg h-10 sm:h-12">
          <Link href={"/create-room"}>Create Room</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-2 sm:px-6 md:px-14 pt-8 sm:pt-16 pb-8">
        {rooms.reverse().map((room) => (
          <div key={room.id} className="flex justify-center items-stretch">
            <RoomCardDisplay roomData={room} />
          </div>
        ))}
      </div>
      {rooms.length === 0 && 
        <div className='flex flex-col items-center mb-10 gap-2'>
          <Image
            src={noDataIcon}
            width={250}
            height={250}
            alt="No data found"
            className="object-contain"
          />
         <div className='flex flex-col md:flex-row items-center gap-2'>
          <h2 className='text-lg sm:text-xl md:text-2xl'>No room found</h2>
          <Button variant={"default"} className='font-serif w-full sm:w-auto h-10 sm:h-12 text-base sm:text-lg' asChild>
            <Link href="/create-room">Create Room</Link>
          </Button>
        </div>
        </div>  
      }
    </div>
  );
}

function RoomCardDisplay({roomData}: {roomData : Room}){
  return (
      <Card className="w-full max-w-[320px] min-w-[200px] mx-auto overflow-hidden shadow-md rounded-lg text-sm sm:text-base">
        <CardHeader>
            <div className='flex justify-between items-center'>
                <CardTitle className="text-base sm:text-lg md:text-xl pb-2 break-words">{roomData.name}</CardTitle>
                <AlertBox roomId={roomData.id}/>
            </div>
          <CardDescription className="px-2 pt-2 pb-4 break-words">{roomData.description}</CardDescription>
        </CardHeader>
        <div className="flex items-center flex-wrap gap-2 px-2 justify-center">
          <TagList languages={splitTags(roomData.language!)} />
        </div>
        <div className="flex flex-col sm:flex-row justify-between px-2 flex-wrap items-center gap-2">
          {roomData.GithubRepo && <CardContent>
            <p className="flex items-center text-xs sm:text-sm">
              <Github className="mr-2" size={16} />
              <Link href={`${roomData.GithubRepo}`} legacyBehavior>
                <a rel="noopener noreferrer" target="_blank" className="border-b border-gray-500 hover:border-black">GitHub</a>
              </Link>
            </p>
          </CardContent>}
          <CardFooter>
            <Button size="sm" className="w-full sm:w-auto">
              <Link href={`rooms/${roomData.id}`}>Join Room</Link>
            </Button>
          </CardFooter>
        </div>
    </Card>
  )
}

export default page
