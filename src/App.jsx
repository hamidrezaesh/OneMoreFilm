import { useState } from "react";
import PickRandom from "./components/PickRandomButton/PickRandomButton";
import GetMovie from "./services/cinemeta";

import desktopBackground from "./assets/home_background.png";
import mobileBackground from "./assets/home_background_mobile.png";
import placeholder from "./assets/placeholder.png";

export default function App() {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handlePick() {
        try {
            setLoading(true);
            setError(null);

            const result = await GetMovie();
            setMovie(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900">
            {/* Github Link */}
            <a
                href="https://github.com/hamidrezaesh/OneMoreFilm"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-5 right-5 z-20
                text-sm font-medium text-white/70
                hover:text-amber-500
                transition-colors duration-200"
            >
                GitHub
            </a>

            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center blur-sm scale-105 hidden md:block"
                style={{ backgroundImage: `url(${desktopBackground})` }}
            />

            <div
                className="absolute inset-0 bg-cover bg-center blur-sm scale-105 block md:hidden"
                style={{ backgroundImage: `url(${mobileBackground})` }}
            />

            <div className="absolute inset-0 bg-black/50" />

            {/* Landing screen */}
            {!movie && (
                <div className="relative z-10 text-center text-white px-4">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                        One More Film
                    </h1>

                    <p className="mt-4 text-gray-300 text-lg md:text-xl">
                        Don't suffocate. Pick one movie randomly.
                    </p>

                    <div className="mt-8">
                        <PickRandom onClick={handlePick} />
                    </div>

                    {loading && (
                        <p className="mt-6 text-gray-300 animate-pulse">
                            Finding your next film...
                        </p>
                    )}

                    {error && (
                        <p className="mt-6 text-red-400">{error}</p>
                    )}
                </div>
            )}

            {/* Movie screen */}
            {movie && (
                <div className="relative z-10 flex flex-col items-center text-center text-white px-6 py-12">

                    {/* Poster */}
                    <a
                        href={`https://www.imdb.com/title/${movie.id}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative block w-56 md:w-72 overflow-hidden rounded-xl shadow-2xl"
                    >
                        <img
                            key={movie.id}
                            src={movie.poster || placeholder}
                            alt={movie.name}
                            onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = "./assets/placeholder.png";
                            }}
                            className="w-full transition-transform duration-300 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/70 group-hover:opacity-100">
              <span className="rounded-lg border border-white/70 px-5 py-3 font-semibold">
                View on IMDb ↗
              </span>
                        </div>
                    </a>

                    {/* Movie details */}
                    <h2 className="mt-6 text-3xl md:text-4xl font-bold">
                        {movie.name}
                    </h2>

                    <p className="mt-2 text-gray-300">
                        {movie.releaseInfo}
                    </p>

                    <p className="mt-4 max-w-xl text-gray-200 leading-relaxed">
                        {movie.description}
                    </p>

                    {/* Another movie */}
                    <button
                        onClick={handlePick}
                        disabled={loading}
                        className="mt-8 rounded-xl border-2 border-amber-500 bg-amber-500 px-8 py-3 text-lg font-semibold text-black transition-all duration-200 hover:bg-transparent hover:text-amber-500 active:scale-95 disabled:opacity-50"
                    >
                        {loading ? "Finding..." : "Pick Another Film"}
                    </button>

                    {error && (
                        <p className="mt-4 text-red-400">{error}</p>
                    )}

                </div>
            )}
        </main>
    );
}