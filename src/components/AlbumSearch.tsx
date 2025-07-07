import { useEffect, useState } from "react";
import type { Datum, Search } from "../types/deezer-types";

const AlbumSearch = () => {
    const [albums, setAlbums] = useState<Search | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [singleSearch, setSingleSearch] = useState<string>("");

    const [currentSearchTerm, setCurrentSearchTerm] = useState<string>("fleetwood mac");
    const [debouncedInputSearchTerm, setDebouncedInputSearchTerm] = useState<string>("");

    // Initial-Fetch ohne debounce
    useEffect(() => {
        fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=fleetwood mac`)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then((data) => {
                setAlbums(data);
                setIsLoading(false);
                setCurrentSearchTerm("fleetwood mac");
            })
            .catch((err) => {
                console.error("Fetch error:", err);
                setError(err.message || "Something went wrong during fetch.");
                setIsLoading(false);
            });
    }, []);

    // debounce-Effekt
    useEffect(() => {
        if (singleSearch === "") {
            return;
        }

        const timer = setTimeout(() => {
            setDebouncedInputSearchTerm(singleSearch);
        }, 800);

        return () => {
            clearTimeout(timer);
        };
    }, [singleSearch]);

    // Suche ausführen bei debounced Input
    useEffect(() => {
        if (!debouncedInputSearchTerm || debouncedInputSearchTerm === currentSearchTerm) return;

        setIsLoading(true);
        setError(null);

        fetch(
            `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${debouncedInputSearchTerm}`
        )
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then((data) => {
                setAlbums(data);
                setIsLoading(false);
                setCurrentSearchTerm(debouncedInputSearchTerm);
            })
            .catch((err) => {
                console.error("Fetch error:", err);
                setIsLoading(false);
                setError(err.message || "Something went wrong during fetch.");
            });
    }, [debouncedInputSearchTerm, currentSearchTerm]);

    return (
        <div className="p-4">
            <input
                type="text"
                placeholder="Search Artist / Song"
                onChange={(e) => setSingleSearch(e.target.value)}
                value={singleSearch}
                className="p-2 border mb-4 block"
            />

            {isLoading && <div className="text-center text-lg text-gray-600">
          Lade Alben...
          {/* Spinner mit Tailwind CSS */}
          <div className="size-8 animate-spin border-blue-500 border-4 border-t-transparent rounded-full mx-auto mt-2"></div>
        </div>}
            {error && (
                <div>
                    <h1>Error</h1>
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()}>Retry</button>
                </div>
            )}

            {!isLoading && !error && albums?.data?.length === 0 && (
                <h1>
                    No results found for "{debouncedInputSearchTerm || currentSearchTerm}"
                </h1>
            )}

            {!isLoading && !error && albums?.data && albums.data.length > 0 && (
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {albums.data.map((album: Datum) => (
                        <div key={album.id} className="border p-2 rounded shadow">
                            <h2 className="font-bold">{album.title}</h2>
                            <p>{album.artist.name}</p>
                            <img
                                src={album.album.cover_medium}
                                alt={album.album.title}
                            />
                            
                            <audio controls src={album.preview} className="w-full"></audio>
                        </div>
                    ))}
                </div>
            )}

            {!isLoading && !error && !albums && !debouncedInputSearchTerm && (
                <div className="text-center text-gray-500">
                    Geben Sie einen Suchbegriff ein oder warten Sie auf die initialen Ergebnisse.
                </div>
            )}
        </div>
    );
};

export default AlbumSearch;
