import React from "react";
import Masonry from "react-masonry-css";
import MediaCard from "./MediaCard";

const breakpointColumnsObj = {
    default: 4,
    1280: 3,
    900: 2,
    600: 1,
};

const MediaGrid = ({ media, likedMedia, onLike }) => {
    return (
        <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex gap-6"
            columnClassName="flex flex-col gap-6"
        >
            {media.map((item, index) => (
                <MediaCard
                    key={index}
                    media={item}
                    // isLiked={likedMedia[item.id]}
                    onLike={onLike}
                />
            ))}
        </Masonry>
    );
};

export default MediaGrid;
