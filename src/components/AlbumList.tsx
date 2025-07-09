import type { Datum } from "../types/deezer-types";


interface AlbumListProps {
    albums: Datum[];
}

const AlbumList: React.FC<AlbumListProps> = ({ albums }) => {
    return (
        <div>
            {albums.map((album) => {
                return (
                    <div key={album.id}>
                        <h2>{album.title}</h2>
                        <p>{album.artist?.name}</p>
                        <img src={album.album?.cover_medium} alt={album.title} />
                    </div>
                );
            })}
        </div>
    );
};

export default AlbumList;
