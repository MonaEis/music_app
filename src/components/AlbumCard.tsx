import type { Datum } from "../types/deezer-types";

type AlbumCardProps = {
    album: Datum;
};

const AlbumCard: React.FC<AlbumCardProps> = ({ album }) => {
    return (
        <div className="bg-blue-100 pt-4 rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <img
                src={album.album?.cover_medium}
                alt={album.album?.title} className="w-full h-48 px-4 object-contain"
            />
            <div className="p-4">

                <h3 className="font-bold text-lg text-gray-900 truncate">{album.title}</h3>
                <p className="text-sm text-gray-600 truncate">{album.artist?.name}</p>
                {/* Optional: Vorschau-Audio hinzufügen */}
                {album.preview && (
                    <audio controls src={album.preview} className="w-full mt-2">
                        Your browser does not support the audio element.
                    </audio>
                )}
            </div>
        </div>
    );
};

export default AlbumCard;
