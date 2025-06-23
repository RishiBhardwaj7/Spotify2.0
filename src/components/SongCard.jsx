import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const SongCard = ({ song, isPlaying, activeSong, data, i }) => {
  const dispatch = useDispatch();

  // Always use attributes for Apple Music data
  const attrs = song.attributes || {};

  const title = attrs.name || song.title || 'No Title';
  const artist = attrs.artistName || song.subtitle || 'No Artist';

  let coverArt = attrs.artwork?.url || song.images?.coverart;
  if (coverArt && attrs.artwork?.url) {
    coverArt = coverArt.replace('{w}', '400').replace('{h}', '400');
  }

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  // For overlay: match both data shapes
  const isActive =
    (activeSong?.attributes?.name || activeSong?.title) === title;

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${isActive ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img alt="song_img" src={coverArt || '/default-image.png'} className="w-full h-full rounded-lg" />
      </div>

      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song.id || song.key}`}>
            {title}
          </Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          {artist}
        </p>
      </div>
    </div>
  );
};

export default SongCard;