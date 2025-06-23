import React from 'react';

import { ArtistCard, Error, Loader } from '../components';
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';

const TopArtists = () => {
  const { data, isFetching, error } = useGetSongsByCountryQuery('US');

  if (isFetching) return <Loader title="Loading artists..." />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Top artists</h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
       {data?.map((track, i) => (
  <ArtistCard key={track.key || track?.artists?.[0]?.adamid || i} track={track} />
))}
      </div>
    </div>
  );
};

export default TopArtists;