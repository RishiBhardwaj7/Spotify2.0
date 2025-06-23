import React from 'react';

const getSongTitle = (song) => song?.title || song?.attributes?.name || 'No active Song';
const getSongArtist = (song) => song?.subtitle || song?.attributes?.artistName || 'No active Song';
const getSongImage = (song) =>
  song?.images?.coverart ||
  (song?.attributes?.artwork?.url
    ? song.attributes.artwork.url.replace('{w}', '125').replace('{h}', '125')
    : undefined);

const Track = ({ isPlaying, isActive, activeSong }) => (
  <div className="flex-1 flex items-center justify-start">
    <div className={`${isPlaying && isActive ? 'animate-[spin_3s_linear_infinite]' : ''} hidden sm:block h-16 w-16 mr-4`}>
      <img src={getSongImage(activeSong)} alt="cover art" className="rounded-full" />
    </div>
    <div className="w-[50%]">
      <p className="truncate text-white font-bold text-lg">
        {getSongTitle(activeSong)}
      </p>
      <p className="truncate text-gray-300">
        {getSongArtist(activeSong)}
      </p>
    </div>
  </div>
);

export default Track;