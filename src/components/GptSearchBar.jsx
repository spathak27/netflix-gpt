import { useRef } from "react";
import lang from "../utils/langConstants";
import { useDispatch, useSelector } from "react-redux";
import client from "../utils/openAi";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();

  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };

  const handleGptSearchClick = async () => {
    console.log(searchText.current.value);

    const gptQuery =
      "Act as a Movie recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      "only give me names of 5 movies, comma separated like the example result given ahead. Example Results: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya ";

    try {
      const gptResults = await client.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: gptQuery }],
      });

      !gptResults.choices
        ? console.error("no content found")
        : console.log(gptResults.choices?.[0]?.message?.content);

      const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie)); //the result will be an array of five promises

      const tmdbResults = await Promise.all(promiseArray);
      console.log(tmdbResults);

      dispatch(
        addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
      );
    } catch (err) {
      console.error("GPT request failed:", err);
    }
  };

  return (
    <div className="pt-[55%]  md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black flex items-center space-x-2"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 bg-white flex-grow"
          placeholder={lang[langKey]?.gptSearchPlaceholder}
        />
        <button
          className="py-2 px-4 m-4 bg-red-600 text-white rounded-lg "
          onClick={handleGptSearchClick}
        >
          {lang[langKey]?.search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
