
const CATALOG_URL =
    "https://cinemeta-catalogs.strem.io/top/catalog/movie/top.json";

const META_URL =
    "https://v3-cinemeta.strem.io/meta/movie/";

const STORAGE_KEY = "one-more-film-watched";

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

    // 2. Get previously shown movie IDs
    const seenIds = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
    );

    // 3. Filter out previously shown movies
    let availableMovies = movies.filter(
        (movie) => !seenIds.includes(movie.id)
    );

    // 4. Reset history if all movies have been shown
    if (availableMovies.length === 0) {
        localStorage.removeItem(STORAGE_KEY);
        availableMovies = movies;
    }

    // 5. Select random movie
    const randomIndex = Math.floor(
        Math.random() * availableMovies.length
    );

    const randomMovie = availableMovies[randomIndex];
    const imdbId = randomMovie.id;

    // 6. Fetch full movie metadata
    const movieResponse = await fetch(
        `${META_URL}${imdbId}.json`
    );

    if (!movieResponse.ok) {
        throw new Error(`Movie error: ${movieResponse.status}`);
    }

    const movieData = await movieResponse.json();

    if (!movieData.meta) {
        throw new Error("Movie metadata not found.");
    }

    if (!movieData.meta?.poster) {
        throw new Error("Movie poster unavailable.");
    }

    // 7. Save ID after successful fetch
    seenIds.push(imdbId);

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(seenIds)
    );

    // 8. Return movie
    return movieData.meta;
}
