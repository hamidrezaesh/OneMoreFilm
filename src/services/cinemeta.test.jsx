import { describe, it, expect } from "vitest";
import GetMovie from "./cinemeta";

describe("GetMovie", () => {
    it("should return a movie", async () => {
        const movie = await GetMovie();

        expect(movie).toBeDefined();
        expect(movie.id).toBeDefined();
        expect(movie.name).toBeDefined();

        console.log("Random movie:", movie.name);
    });
});