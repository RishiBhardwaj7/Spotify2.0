import React from 'react';
import { useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';

const COUNTRY_CODE = 'IN'; // Change to 'IN' for India, or 'US' for USA

const TopCharts = () => {
  
  const { data, isFetching, error } = useGetSongsByCountryQuery(COUNTRY_CODE);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  // Support both Shazam and Apple Music API shapes
  const songs = Array.isArray(data)
    ? data
    : Array.isArray(data?.data)
      ? data.data
      : [];
console.log('songs', songs);
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Discover Top Charts ({COUNTRY_CODE})
      </h2>
      {isFetching ? (
        <Loader title="Loading Top Charts" />
      ) : error ? (
        <Error />
      ) : (
        <div className="flex flex-wrap sm:justify-start justify-center gap-8">
          {songs.map((song, i) => (
            <SongCard
              key={song.key || song.id || song?.artists?.[0]?.adamid || i}
              song={song}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={songs}
              i={i}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TopCharts;