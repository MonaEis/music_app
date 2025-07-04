import { useEffect, useState } from "react";

const AlbumSearch = () => {
    const [albums, setAlbums] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null); // State für Fehlermeldung
    const [singleSearch, setSingleSearch] = useState<string>(""); // Bleibt leer für das Input-Feld

    // State für den tatsächlich gesuchten Begriff, initialisiert mit "fleetwood mac"
    const [currentSearchTerm, setCurrentSearchTerm] =
        useState<string>("fleetwood mac");
    // State für den verzögerten Suchbegriff aus dem Input-Feld
    const [debouncedInputSearchTerm, setDebouncedInputSearchTerm] =
        useState<string>("");

    // Effekt, der den Wert aus dem Input-Feld verzögert auf `debouncedInputSearchTerm` setzt
    useEffect(() => {
        // Lösche den Timer, wenn das Input-Feld leer ist und wir nicht initial laden
        // Das verhindert, dass ein leeres Suchfeld eine Suche auslöst, wenn man alles löscht
        if (singleSearch === "" && currentSearchTerm !== "fleetwood mac") {
            setDebouncedInputSearchTerm("");
            setAlbums(null); // Optional: Leere die Alben, wenn das Suchfeld geleert wird
            setIsLoading(false);
            setError(null);
            return;
        }

        const timer = setTimeout(() => {
            setDebouncedInputSearchTerm(singleSearch);
        }, 800);

        return () => {
            clearTimeout(timer);
        };
    }, [singleSearch, currentSearchTerm]); // Abhängigkeit von currentSearchTerm hinzugefügt

    // Effekt, der den Fetch-Request ausführt
    useEffect(() => {
        let termToFetch = currentSearchTerm;

        // Wenn der Benutzer etwas in das Input-Feld getippt hat (und es nicht initial leer ist),
        // und dieser Wert "debounced" wurde, dann nutzen wir diesen neuen Wert für die Suche.
        // Das verhindert, dass der initiale "fleetwood mac" überschrieben wird, solange
        // der Benutzer nichts eingegeben hat.
        if (
            debouncedInputSearchTerm !== "" &&
            debouncedInputSearchTerm !== currentSearchTerm
        ) {
            termToFetch = debouncedInputSearchTerm;
        } else if (
            singleSearch === "" &&
            currentSearchTerm === "fleetwood mac" &&
            debouncedInputSearchTerm === ""
        ) {
            // Sonderfall: Wenn input leer ist, currentSearchTerm "fleetwood mac" und debouncedInputSearchTerm leer ist,
            // dann sollen wir den initialen Wert verwenden. Dies deckt den ersten Render ab.
            termToFetch = "fleetwood mac";
        }

        // Nur fetchen, wenn ein Suchbegriff vorhanden ist und wir uns nicht in einem Zustand befinden,
        // in dem der initiale Wert bereits geladen wurde und das Suchfeld leer ist.
        if (termToFetch) {
            setIsLoading(true);
            setError(null); // Reset error state on new search

            // Um zu vermeiden, dass der initiale Fetch (fleetwood mac) immer wieder ausgeführt wird,
            // wenn debouncedInputSearchTerm leer wird, aber currentSearchTerm noch "fleetwood mac" ist.
            // Der Fetch soll nur ausgeführt werden, wenn sich der tatsächlich gesuchte Begriff ändert.
            if (
                termToFetch === currentSearchTerm &&
                albums !== null &&
                debouncedInputSearchTerm === ""
            ) {
                setIsLoading(false);
                return; // Verhindert unnötigen Re-Fetch des initialen Werts
            }

            fetch(
                `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${termToFetch}`
            )
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.json();
                })
                .then((data) => {
                    console.log(data);
                    setAlbums(data);
                    setIsLoading(false);
                    // Aktualisiere den currentSearchTerm, damit wir wissen, was zuletzt erfolgreich gesucht wurde
                    setCurrentSearchTerm(termToFetch);
                })
                .catch((err) => {
                    console.error("Fetch error:", err);
                    setIsLoading(false);
                    setError(
                        err.message || "Something went wrong during fetch."
                    );
                });
        } else {
            // Wenn der (debounced) Suchbegriff leer ist, leeren wir die Alben und sind nicht mehr am Laden
            setAlbums(null);
            setIsLoading(false);
            setError(null);
        }
    }, [debouncedInputSearchTerm, currentSearchTerm]); // Abhängigkeiten angepasst

    return (
        <div className="p-4">
            <input
                type="text"
                placeholder="Search" // <-- placeholder wird angezeigt, da value leer ist
                onChange={(e) => setSingleSearch(e.target.value)}
                value={singleSearch} // Dies steuert den angezeigten Wert im Input
                className="p-2 border mb-4 block"
            />

            {isLoading && <h1>Loading...</h1>}
            {error && (
                <div>
                    <h1>Error</h1>
                    <p>{error}</p> {/* Zeige Fehlermeldung an */}
                    <button onClick={() => window.location.reload()}>
                        Retry
                    </button>
                </div>
            )}
            {!isLoading &&
                !error &&
                albums?.data?.length === 0 &&
                (debouncedInputSearchTerm || currentSearchTerm) && (
                    // Zeige "No results" nur an, wenn eine Suche (initial oder durch Input) stattgefunden hat und keine Ergebnisse lieferte
                    <h1>
                        No results found for "
                        {debouncedInputSearchTerm || currentSearchTerm}"
                    </h1>
                )}
            {!isLoading && !error && albums?.data?.length > 0 && (
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {albums.data.map((album: any) => (
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
                            <p>{album.album.release_date}</p>
                            <audio
                                controls
                                src={album.preview}
                                className="w-full"
                            ></audio>
                        </div>
                    ))}
                </div>
            )}
            {/* Optional: Anzeige, wenn noch nichts gesucht wurde, aber initialer Zustand */}
            {!isLoading && !error && !albums && !debouncedInputSearchTerm && (
                <div className="text-center text-gray-500">
                    Geben Sie einen Suchbegriff ein oder warten Sie auf die
                    initialen Ergebnisse.
                </div>
            )}
        </div>
    );
};

export default AlbumSearch;