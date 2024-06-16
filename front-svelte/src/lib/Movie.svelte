<script lang="ts">
    import { type IMovie } from "../main";

    export let movie: IMovie;
</script>

<div class="movie">
    <span>{ movie.name }</span>
    <span>{ movie.genre }</span>
    <span>{ movie.previewImage }</span>
    <span>{ movie.previewVideoLink }</span>
</div>

<style lang="scss">
    .movie {
      display: flex;
      flex-direction: column;
      border: 1px solid white;
      border-radius: 5px;
      margin-bottom: 5px;
    }
</style>
