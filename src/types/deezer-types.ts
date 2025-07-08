// To parse this data:
//
//   import { Convert, Search } from "./src/types/deezer-types.ts";
//
//   const search = Convert.toSearch(json);

export type Search = {
    data:  Datum[];
    total: number;
    next:  string;
}

export type Datum = {
    id:                      number;
    readable?:                boolean;
    title:                   string;
    title_short?:             string;
    title_version?:           string;
    link?:                    string;
    duration?:                number;
    rank?:                    number;
    explicit_lyrics?:         boolean;
    explicit_content_lyrics?: number;
    explicit_content_cover?:  number;
    preview?:                 string;
    md5_image?:               string;
    artist:                  Artist;
    album?:                   Album;
    type?:                    DatumType;
}

export type Album = {
    id:           number;
    title:        string;
    cover:        string;
    cover_small:  string;
    cover_medium: string;
    cover_big:    string;
    cover_xl:     string;
    md5_image:    string;
    tracklist:    string;
    type:         AlbumType;
}

export type AlbumType = "album";

export type Artist = {
    id:             number;
    name:           string;
    link:           string;
    picture:        string;
    picture_small:  string;
    picture_medium: string;
    picture_big:    string;
    picture_xl:     string;
    tracklist:      string;
    type:           ArtistType;
}

export type ArtistType = "artist";

export type DatumType = "track";

// Converts JSON strings to/from your types
export const toSearch = (json: string): Search => JSON.parse(json) as Search;
export const searchToJson = (value: Search): string => JSON.stringify(value);
