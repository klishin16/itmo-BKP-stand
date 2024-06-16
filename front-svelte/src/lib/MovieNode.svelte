<script lang="ts">
    import { type IMovie } from "../main";

    export let movie: IMovie;
    export let targetDeep: number;
    export let currentDeep: number;
</script>

<div class="movie-node">
    {#if currentDeep === targetDeep}
        <span>{ movie.name }</span>
    {:else}
        <svelte:self movie={movie} targetDeep={targetDeep} currentDeep={currentDeep + 1} />
        <svelte:self movie={movie} targetDeep={targetDeep} currentDeep={currentDeep + 1} />
    {/if}
</div>

<style lang="scss">
    .movie-node {
      display: flex;
      flex-direction: column;
      gap: 1px;
      border: 1px solid white;
      width: 100%;
      border-radius: 5px;
      padding: 1px;
    }
</style>
