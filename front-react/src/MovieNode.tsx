import React from 'react';
import { IMovie } from "./types.ts";

interface IMovieProps {
    movie: IMovie;
    targetDeep: number;
    currentDeep: number;
}

const MovieNode: React.FC<IMovieProps> = ({ movie, currentDeep, targetDeep }) => {
    return (
        <div style={ {
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            border: '1px solid white',
            width: '100%',
            borderRadius: 5,
            padding: 1
        } }>
            { currentDeep === targetDeep ?
                <>
                    <span>{ movie.name }</span>
                </>
                :
                <>
                    <MovieNode movie={movie} targetDeep={targetDeep} currentDeep={currentDeep + 1}></MovieNode>
                    <MovieNode movie={movie} targetDeep={targetDeep} currentDeep={currentDeep + 1}></MovieNode>
                </>
            }
        </div>
    );
};

export default MovieNode;
