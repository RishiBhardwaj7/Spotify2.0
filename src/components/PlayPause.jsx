import React from 'react';
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

const getSongTitle = (song) => song?.title || song?.attributes?.name;
const isSameSong = (activeSong, song) =>
  getSongTitle(activeSong) === getSongTitle(song);

const PlayPause = ({ isPlaying, activeSong, song, handlePause, handlePlay }) =>
  isPlaying && isSameSong(activeSong, song) ? (
    <FaPauseCircle
      size={35}
      className="text-gray-300"
      onClick={handlePause}
    />
  ) : (
    <FaPlayCircle
      size={35}
      className="text-gray-300"
      onClick={handlePlay}
    />
  );

export default PlayPause;