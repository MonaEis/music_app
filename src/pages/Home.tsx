// import { useEffect, useState } from "react"

import AlbumSearch from "../components/AlbumSearch"

const Home = () => {
// const [isLoading, setIsLoading] = useState(true);
// const [singleSearch, setSingleSearch] = useState<any>(null);

// useEffect(() => {
//     setIsLoading(true);
//   fetch("https://api.deezer.com/search?q=eminem")
//   .then(res => res.json())
//   .then((data) => {
//     console.log(data)
//     setIsLoading(false);
//     setSingleSearch(data);
//   })
// }, [])


  return (
    <div>
      
      <AlbumSearch/>
      {/* {
        isLoading ? <h1>Loading...</h1> :  singleSearch.data.map((song) => {
          return (
            <div key={song.id}>
              <h1>{song.title}</h1>
              <h2>{song.artist.name}</h2>
              <a href={song.artist.link}>Song-Link</a>
              <img src={song.album.cover} alt={song.album.title} />
            </div>
          )
        })} */}
        </div>
  )
}

export default Home
