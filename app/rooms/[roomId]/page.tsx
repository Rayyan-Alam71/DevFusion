import { getRoomDetail } from "@/services/rooms";
import { Github } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge"


export default async function Page({ params } : {params : {roomId : string}}) {
    // asynchronous access of `params.id`.
    const { roomId} = await params;
    const roomDetail = await getRoomDetail(roomId);
    const languages = roomDetail?.language?.split(",").map((lang)=>lang.trim())
    if(!roomDetail){
      return <p>No room found for this RoomId</p>
    }

    return(
      <div>
        <div className="grid grid-cols-1 md:grid-cols-4 min-h-screen">
          <div className="md:col-span-3">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col gap-4 m-4 p-8">VIDEO PLAYER</div>
          </div>
          <div className="col-span-1 flex flex-col gap-2 w-fit ">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-8 flex flex-col gap-4 m-4">
                <h1 className="text-lg font-semibold">{roomDetail.name}</h1>
                <p className="text-sm text-gray-600 ">{roomDetail.description}</p>
                {roomDetail.GithubRepo && 
                            <p className="flex items-center border border-gray-500 rounded-md p-1 w-fit"><Github className="mr-2"/><Link href={`${roomDetail.GithubRepo}`} legacyBehavior><a rel="noopener noreferrer" target="_blank">GitHub</a></Link></p>
                  
                }
                <div className="flex gap-2 flex-wrap">
                  {languages?.map((lang)=>(
                        <Badge key={lang} className="p-1">{lang}</Badge>
                  ))}
                </div>
                
            </div>          
          </div>
        </div>
      </div>
    )
  }