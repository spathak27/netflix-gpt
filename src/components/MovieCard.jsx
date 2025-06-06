import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;
  return (
    <div className=" w-40 md:w-48  pr-4">
      <img alt="Movie Card" src={IMG_CDN_URL + posterPath}></img>
    </div>
  );
};

export default MovieCard;
