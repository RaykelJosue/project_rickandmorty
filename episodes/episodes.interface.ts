// src/episodes/episode.interface.ts
/* eslint-disable prettier/prettier */
export interface EpisodeResponse {
    info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    };
    results: Array<{
        id: number;
        name: string;
        air_date: string;
        episode: string;
        characters: string[];
        url: string;
        created: string;
    }>;
}
