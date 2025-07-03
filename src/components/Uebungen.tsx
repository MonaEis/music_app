
import { useState } from "react";
import Button from "./Button";
import Counter from "./Counter";
import Footer from "./Footer";
import Greetings from "./Greetings";
import Header from "./Header";
import AlbumList from "./AlbumList";

const albums = [
    {
        id: "1",
        title: "Random Access Memories",
        artist: "Daft Punk",
        cover: "https://cdn-images.dzcdn.net/images/cover/311bba0fc112d15f72c8b5a65f0456c1/0x1900-000000-80-0-0.jpg",
    },
    {
        id: "2",
        title: "To Pimp a Butterfly",
        artist: "Kendrick Lamar",
        cover: "https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/3/11/1426099817173/f1efb3f4-9a6d-4f78-8ca8-594ab646d198-bestSizeAvailable.jpeg?width=465&dpr=1&s=none&crop=none",
    },
    {
        id: "3",
        title: "Currents",
        artist: "Tame Impala",
        cover: "https://m.media-amazon.com/images/I/A1LVEJikmZL.jpg",
    },
    {
        id: "4",
        title: "A Moon Shaped Pool",
        artist: "Radiohead",
        cover: "https://m.media-amazon.com/images/I/815bmGN5LML.jpg",
    },
    {
        id: "5",
        title: "IGOR",
        artist: "Tyler, The Creator",
        cover: "https://www.byte.fm/blog/wp-content/uploads/2019/05/Tyler_the_Creator_Igor_Rezi_410.jpeg",
    },
];

function Uebungen() {
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <>
            <Header />
            {!loggedIn && (
                <>
                    <button onClick={() => setLoggedIn(true)}>Login</button>
                    <br />
                </>
            )}
            {loggedIn && (
                <>
                    <h1>Willkommen!</h1>
                    <button onClick={() => setLoggedIn(false)}>Logout</button>
                    <br />
                </>
            )}
            <Counter />
            <Greetings name="Dude" />
            <Greetings name="Du" />
            <Button label="Click me" onClick={() => console.log("clicked")} />
            <AlbumList albums={albums} />

            <Footer />
        </>
    );
}

export default Uebungen;
