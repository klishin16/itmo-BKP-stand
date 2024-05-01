import { Profiler, useEffect, useState } from 'react'
import './App.css'

export interface IMovie {
    id: string;
    name: string;
    previewImage: string;
    previewVideoLink: string;
    genre: string;
}

function useForceUpdate() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update state to force render
    // A function that increment 👆🏻 the previous state like here
    // is better than directly setting `setValue(value + 1)`
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

function App({ p_n  }: { p_n?: number }) {
    const n: number = p_n ?? 128;
    const [movies, setMovies] = useState<IMovie[]>([])

    useEffect(() => {
        fetch(`${BACKEND_URL}/movies/${n}`)
            .then(response => response.json())
            .then(data => setMovies(data))
    }, []);

    const handleRender = (
        _id: string, // Unique identifier for the Profiler
        _phase: "mount" | "update" | "nested-update", // Either "mount" (if the component just mounted) or "update" (if it re-rendered)
        _actualDuration: number, // Time spent rendering the committed update
        _baseDuration: number, // Estimated time to render the entire subtree without memoization
        startTime: number, // When React started rendering this update
        commitTime: number, // When React committed this update
    ) => {
        console.log(`Render statistics: items: ${n}, time: ${(commitTime - startTime).toFixed(3)}, relative: ${((commitTime - startTime) / n * 1000).toFixed(3)}`)
    }

    const forceUpdate = useForceUpdate();

    return (
        <Profiler id={ 'root' } onRender={ handleRender }>
            <div className='page'>
                <button id="render-btn" onClick={ forceUpdate }>Render</button>
                <ul>
                    { movies.map(movie => (
                        <li key={ movie.id } style={ {
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
                        </li>
                    )) }
                </ul>
            </div>
        </Profiler>
    )
}

export default App
