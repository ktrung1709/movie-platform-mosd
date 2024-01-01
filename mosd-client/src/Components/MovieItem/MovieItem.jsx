import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { moviePropTypes } from "../../PropTypes/MoviePropTypes.js";
import './style.scss'

const MovieItem = ({ movie }) => {
  return (
    <div>
      <div className="border border-border p-1 h-5/6 hover:scale-95 transitions relative rounded overflow-hidden">
        <Link to={`/movie/${movie?.name}`} className="w-full">
          <img
            src={movie?.thumbnail}
            alt={movie?.name}
            className="w-full movie-thumbnail object-cover"
          />
        </Link>
        <div className="absolute flex-btn gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-3">
          <h3 className="font-semibold truncate">{movie?.name}</h3>
          <button className="h-9 w-9 text-sm flex-colo transitions hover:bg-transparent border-2 border-subMain rounded-md bg-subMain text-white">
            <FaHeart />
          </button>
        </div>
      </div>
    </div>
  );
};

MovieItem.propTypes = {
  movie: moviePropTypes.isRequired,
};

export default MovieItem;