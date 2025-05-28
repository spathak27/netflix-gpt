import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  const Movies = Array.isArray(movies) ? movies : [];
  return (
    <div className="px-6 ">
      <h1 className="text-lg md:text-2xl py-4 text-white">{title}</h1>
      <div className="flex overflow-x-scroll  no-scrollbar">
        <div className="flex ">
          {Movies.length > 0 ? (
            Movies?.map((movie) => (
              <MovieCard key={movie.id} posterPath={movie?.poster_path} />
            ))
          ) : (
            <p>No movies available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
