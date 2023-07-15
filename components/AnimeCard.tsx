import React from "react";

interface AnimeCardProps {
    data: Record<string, any>;
}

const AnimeCard:React.FC<AnimeCardProps>= ({ data}) => {
    return (
        <div className="
        group bg-zinc-900 col-span relative h-[12vw]">
            <img src={data.thumbnailUrl}/>

        </div>
    )
}

export default AnimeCard;
