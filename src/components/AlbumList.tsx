export interface Album {
    id: string;
    title: string;
    artist: string;
    cover: string;
}

interface AlbumListProps {
    albums: Album[];
}

const AlbumList: React.FC<AlbumListProps> = ({ albums }) => {
    return (
        <div>
            {albums.map((album) => {
                return (
                    <div key={album.id}>
                        <h2>{album.title}</h2>
                        <p>{album.artist}</p>
                        <img src={album.cover} alt={album.title} />
                    </div>
                );
            })}
        </div>
    );
};

export default AlbumList;
