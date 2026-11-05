const CATALOG_URL =
    "https://cinemeta-catalogs.strem.io/top/catalog/movie/top.json";

const META_URL =
    "https://v3-cinemeta.strem.io/meta/movie/";

export default async function GetMovie() {
    // 1. Fetch catalog
    const catalogResponse = await fetch(CATALOG_URL);

    if (!catalogResponse.ok) {
        throw new Error(`Catalog error: ${catalogResponse.status}`);
    }

    const catalogData = await catalogResponse.json();
    const movies = catalogData.metas ?? [];

    if (movies.length === 0) {
        throw new Error("No movies found in catalog.");
    }

    // 2. Select random movie
    const randomIndex = Math.floor(Math.random() * movies.length);
    const randomMovie = movies[randomIndex];

    // 3. Get IMDb ID
    const imdbId = randomMovie.id;

    // 4. Fetch full movie metadata
    const movieResponse = await fetch(
        `${META_URL}${imdbId}.json`
    );

    if (!movieResponse.ok) {
        throw new Error(`Movie error: ${movieResponse.status}`);
    }

    const movieData = await movieResponse.json();

    // 5. Return movie
    return movieData.meta;
}
