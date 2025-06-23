import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Error, Loader, SongCard } from '../components';
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';
import { selectCountryListId } from '../redux/features/playerSlice';

const countries = [
  { title: 'United States', value: 'US' },
  { title: 'India', value: 'IN' },
  { title: 'United Kingdom', value: 'GB' },
  { title: 'France', value: 'FR' },
  { title: 'Germany', value: 'DE' },
  // Add more as needed
];
const Discover = () => {
  const dispatch = useDispatch();
  const { countryListId, activeSong, isPlaying } = useSelector((state) => state.player);

  // Always default to 'US' if countryListId is falsy (empty, null, undefined)
  const countryCode = countryListId && countryListId.trim() !== '' ? countryListId : 'US';
  const { data, isFetching, error } = useGetSongsByCountryQuery(countryCode);

  if (isFetching) return <Loader title="Loading songs..." />;
  if (error) return <Error />;

  const countryTitle = countries.find(({ value }) => value === countryCode)?.title || 'United States';

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">Discover {countryTitle}</h2>
        <select
          onChange={(e) => dispatch(selectCountryListId(e.target.value))}
          value={countryCode}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {countries.map((country) => (
            <option key={country.value} value={country.value}>{country.title}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard
            key={song.key || song?.artists?.[0]?.adamid || i}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;