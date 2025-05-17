import { splitTags, TagList } from '@/components/TagList'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Room } from '@/db/schema'
import { getRooms } from '@/services/rooms'
import { Github } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { deleteRoom, getUserRooms } from './actions'
import AlertBox from '@/components/Alert-box'


const page = async () => {
  const rooms = await getUserRooms();
  return (
    <div>
      <div className="flex justify-between px-16 pt-16 w-full">

        <div className="flex flex-col space-y-2">
          <div className="text-4xl">
          Browse through your rooms
          </div>
        </div>
        <Button asChild>
        <Link href={"/create-room"}>Create Room</Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-5 px-14 pt-20 pb-15 ">
        {rooms.map((room)=>(
          <>
            <div key={room.id+Math.random()} className="mr-2 mt-2"><RoomCardDisplay roomData={room}/></div>
            </>
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
      <Card className="overflow-hidden">
        <CardHeader>
            <div className='flex justify-between items-center'>
                <CardTitle className="text-xl pb-2">{roomData.name}</CardTitle>
                <AlertBox roomId={roomData.id}/>
            </div>
          <CardDescription className="px-4 pt-4 pb-6">{roomData.description}</CardDescription>
        </CardHeader>
        <div className="flex items-center flex-wrap gap-2 px-4">
          <TagList languages={splitTags(roomData.language!)}/>
        </div>
        <div className="flex md:justify-between px-2 md:flex-row sm:flex-column flex-wrap items-center">
          {roomData.GithubRepo && <CardContent>
            <p className="flex items-center"><Github className="mr-2"/><Link href={`${roomData.GithubRepo}`} legacyBehavior><a rel="noopener noreferrer" target="_blank" className="border-b border-gray-500 hover:border-black sm:mb-1 md:mb-0">GitHub</a></Link></p>
          </CardContent>}
          <CardFooter>
            <Button><Link href={`rooms/${roomData.id}`}>Join Room</Link></Button>
          </CardFooter>
        </div>
    </Card>
  )
}


export default page
