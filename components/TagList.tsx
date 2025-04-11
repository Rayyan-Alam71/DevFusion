import { Badge } from "./ui/badge";

export function splitTags(language : string){
    return language?.split(",").map((lang)=>lang.trim())
}

export function TagList({languages} : {languages : string[]}){
    return (
        <div className="flex gap-2 flex-wrap">
            {languages?.map((lang)=>(
                <Badge key={lang} className="p-1">{lang}</Badge>
            ))}
        </div>
    )
}