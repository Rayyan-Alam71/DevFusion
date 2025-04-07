import { CreateRoomForm } from "./CreateRoom";

export default function Room(){
    return (
        <div className="mx-auto container w-5/6 flex flex-col gap-8 py-8">
            <h1 className="text-4xl font-semibold mx-auto">Create Room </h1>
            <CreateRoomForm/>
        </div>
    )
}