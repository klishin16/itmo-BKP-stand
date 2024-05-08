import { Profiler, useEffect, useState } from 'react'
import './App.css'
import Controls from "./Controls.tsx";
import { ETestType, IMovie, IState } from "./types.ts";
import Movie from "./Movie.tsx";
import MovieNode from "./MovieNode.tsx";
import { BACKEND_URL, LOAD_MOVIES_COUNT } from "./constants.ts";

function useForceUpdate() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update state to force render
    // A function that increment 👆🏻 the previous state like here
    // is better than directly setting `setValue(value + 1)`
}

const initialState: IState = {
    isShow: true,
    testType: ETestType.STATIC,
    itemsCount: 7
}

function App() {
    const [loadedMovies, setLoadedMovies] = useState<IMovie[]>([])
    const [movies, setMovies] = useState<IMovie[]>([])
    const [state, setState] = useState<IState>(initialState);

    useEffect(() => {
        fetch(`${BACKEND_URL}/movies/${LOAD_MOVIES_COUNT}`)
            .then(response => response.json())
            .then(data => setLoadedMovies(data))
    }, []);

    useEffect(() => {
        if (loadedMovies.length) {
            setMovies(Array.from(Array(state.itemsCount), (_, index) => loadedMovies[index % LOAD_MOVIES_COUNT]));
        }
    }, [loadedMovies, state.itemsCount]);

    const handleRender = (
        _id: string, // Unique identifier for the Profiler
        _phase: "mount" | "update" | "nested-update", // Either "mount" (if the component just mounted) or "update" (if it re-rendered)
        _actualDuration: number, // Time spent rendering the committed update
        _baseDuration: number, // Estimated time to render the entire subtree without memoization
        startTime: number, // When React started rendering this update
        commitTime: number, // When React committed this update
    ) => {
        console.log(`Render statistics: items: ${state.itemsCount}, time: ${(commitTime - startTime).toFixed(3)}, relative: ${((commitTime - startTime) / state.itemsCount * 1000).toFixed(3)}`)
    }

    const forceUpdate = useForceUpdate();

    return (
        <Profiler id={ 'root' } onRender={ handleRender }>
            <div className='page'>
                <Controls
                    testType={state.testType}
                    itemsCount={state.itemsCount}
                    onForceUpdate={() => forceUpdate()}
                    onToggleShow={() => setState(state => ({ ...state, isShow: !state.isShow }))}
                    onSwitchTest={(testType) => setState(state => ({ ...state, testType, itemsCount: initialState.itemsCount }))}
                    onItemsCountChange={(itemsCount) => setState(state => ({ ...state, itemsCount }))}
                />
                {/* Render static content */}
                { state.isShow && state.testType === ETestType.STATIC &&
                    <ul style={ {listStyle: 'none', padding: 0} }>
                        { movies.map((movie, index) => (
                            <li key={ index } style={ {
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
                }
                {/* Render components list */}
                { state.isShow && state.testType === ETestType.LIST &&
                    <ul style={ {listStyle: 'none', padding: 0} }>
                        { movies.map((movie, index) => <Movie key={ index } movie={ movie } />) }
                    </ul>
                }
                {/* Render components tree */}
                { state.isShow && state.testType === ETestType.TREE && movies.length &&
                    <MovieNode movie={movies[0]} currentDeep={0} targetDeep={state.itemsCount} />
                }
            </div>
        </Profiler>
    )
}

export default App
