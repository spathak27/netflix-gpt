import lang from "../utils/langConstants";
import { useSelector } from "react-redux";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);

  return (
    <div className="pt-[10%] flex justify-center">
      <form className=" w-1/2 bg-black flex items-center space-x-2">
        <input
          type="text"
          className="p-4 m-4 bg-white flex-grow"
          placeholder={lang[langKey]?.gptSearchPlaceholder}
        />
        <button className="py-2 px-4 m-4 bg-red-600 text-white rounded-lg">
          {lang[langKey]?.search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
