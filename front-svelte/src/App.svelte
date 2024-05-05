<script lang="ts">
  import { onMount } from "svelte";

  interface IMovie {
    id: string;
    name: string;
    previewImage: string;
    previewVideoLink: string;
    genre: string;
  }

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

  const n: number = 128;

  let movies: IMovie[] = [];

  onMount(async () => {
    await fetch(`${BACKEND_URL}/movies/${n}`)
            .then(response => response.json())
            .then(data => {
              movies = [...movies, ...data]
            })
  })


  let count = 1;
</script>

<main>
  <div class='page'>
    <button id="render-btn" on:click={() => count += 1}>Render</button>
    <h4>Count: {count}</h4>
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
  </div>
</main>

<style>
  .hidden {
    display: none;
  }
</style>
