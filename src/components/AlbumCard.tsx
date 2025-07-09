import type { Datum } from "../types/deezer-types";

type AlbumCardProps = {
    data: Datum[];
};

const AlbumCard: React.FC<AlbumCardProps> = ({ data: album }) => {
    return (
        <div key={album.id} className="border p-2 rounded shadow">
                            <h2 className="font-bold">{album.title}</h2>
                            <p>{album.artist.name}</p>
                            <img
                                src={album.album?.cover_medium}
                                alt={album.album?.title}
                            />

                            <audio controls src={album.preview} className="w-full"></audio>
                        </div>
    );
};

export default AlbumCard;
