import { useEffect, useState } from "react";

const AlbumSearch = () => {
    const [albums, setAlbums] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [singleSearch, setSingleSearch] = useState<string>("eminem");

    //   useEffect(() => {
    //     setIsLoading(true);
    //     fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${singleSearch}`)
    //       .then((res) => res.json())
    //       .then((data) => {
    //         console.log(data);
    //         setAlbums(data);
    //         setIsLoading(false);
    //       })
    //       .catch((err) => {
    //         console.error(err);
    //         setIsLoading(false);
    //       });
    //   }, [singleSearch]); // ✅ fetch immer bei Änderung von singleSearch

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            setIsLoading(true);
            fetch(
                `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${singleSearch}`
            )
                .then((res) => res.json())
                .then((data) => {
                    setAlbums(data);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setIsLoading(false);
                    setError(true);
                });
        }, 800); // 800ms warten nach letzter Eingabe

        return () => clearTimeout(delaySearch); // vorherigen Timer löschen
    }, [singleSearch]);

    return (
        <div className="p-4">
            {isLoading && <h1>Loading...</h1>}
            {!isLoading && (
                <>
                    <input
                        type="text"
                        placeholder="Search"
                        onChange={(e) => setSingleSearch(e.target.value)}
                        value={singleSearch}
                        className="p-2 border mb-4 block"
                    />

                    <div className="grid grid-cols-2 gap-4">
                        {albums?.data?.map((album: any) => (
                            <div
                                key={album.id}
                                className="border p-2 rounded shadow"
                            >
                                <h2 className="font-bold">{album.title}</h2>
                                <p>{album.artist.name}</p>
                                <img
                                    src={album.album.cover_medium}
                                    alt={album.album.title}
                                />
                                <audio
                                    controls
                                    src={album.preview}
                                    className="w-full"
                                ></audio>{" "}
                                {/* 🎧 30s Preview */}
                            </div>
                        ))}
                    </div>
                </>
            )}
            {error && (
                <div>
                    <h1>Error</h1>
                    <p>Something went wrong</p>
                    <button onClick={() => window.location.reload()}>
                        Retry
                    </button>
                </div>
            )}
        </div>
    );
};

export default AlbumSearch;
