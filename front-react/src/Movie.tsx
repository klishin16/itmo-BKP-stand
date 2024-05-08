import React from 'react';
import { IMovie } from "./types.ts";

interface IMovieProps {
    movie: IMovie
}

const Movie: React.FC<IMovieProps> = ({ movie }) => {
    return (
        <div style={ {
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid white',
            borderRadius: 5,
            marginBottom: 5
        } }>
            <span>{ movie.name }</span>
            <span>{ movie.genre }</span>
            <span>{ movie.previewImage }</span>
            <span>{ movie.previewVideoLink }</span>
        </div>
    );
};

export default Movie;
