<script lang="ts">
  import { onMount } from "svelte";
  import Controls from "./lib/Controls.svelte";
  import { ETestType, LOAD_MOVIES_COUNT } from "./main";
  import Movie from "./lib/Movie.svelte";
  import MovieNode from "./lib/MovieNode.svelte";

  interface IMovie {
    id: string;
    name: string;
    previewImage: string;
    previewVideoLink: string;
    genre: string;
  }

  /** State */
  let itemsCount: number = 7;
  let testType: ETestType = ETestType.STATIC;
  let isShow: boolean = true;
  /** End state */

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

  const n: number = 128;

  let loadedMovies: IMovie[] = [];
  let movies: IMovie[] = [];

  onMount(async () => {
    await fetch(`${BACKEND_URL}/movies/${n}`)
            .then(response => response.json())
            .then(data => {
              loadedMovies = [...loadedMovies, ...data]
            })
  })

  let count = 1;
  const onForceRerender = () => {
    console.log('Force Rerender');
    count += 1
  }

  const onToggleShow = () => {
    isShow = !isShow
  }

  const onSwitchTest = (paramTestType: ETestType) => {
    testType = paramTestType;
  }

  const onItemsCountChange = (count: number) => {
    itemsCount = count;
  }

  $: {
    movies = [...loadedMovies.filter((_, idx) => idx <= itemsCount)]
  }
</script>

<main>
  <div class='page'>
    <Controls
            forceRerender={onForceRerender}
            toggleShow={onToggleShow}
            switchTest={onSwitchTest}
            itemsCountChange={onItemsCountChange}
            testType={testType}
            itemsCount={itemsCount}
    />
    {#if isShow}
      {#if testType === ETestType.STATIC}
        <ul>
          {#each movies as {id, name, genre, previewImage, previewVideoLink} (id)}
            <li class="list-item">
              <span>{ name }</span>
              <span>{ genre }</span>
              <span>{ previewImage }</span>
              <span>{ previewVideoLink }</span>
              <span class="hidden">{ count }</span>
            </li>
          {/each}
        </ul>
      {/if}

      {#if testType === ETestType.LIST}
        <ul>
          {#each movies as movie (movie.id)}
            <Movie movie={movie} />
          {/each}
        </ul>
      {/if}

      {#if testType === ETestType.TREE}
        <MovieNode movie={movies[0]} currentDeep={0} targetDeep={itemsCount} />
      {/if}
    {/if}
  </div>
</main>

<style>
  .hidden {
    display: none;
  }

  .page {
    padding: 2rem;
  }
</style>
