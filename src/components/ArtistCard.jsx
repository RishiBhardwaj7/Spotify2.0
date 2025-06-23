import React from 'react';
import { useNavigate } from 'react-router-dom';

const getArtistId = (track) =>
  track?.artists?.[0]?.adamid ||
  track?.attributes?.artistId ||
  track?.id;

const getArtistImage = (track) =>
  track?.images?.coverart ||
  (track?.attributes?.artwork?.url
    ? track.attributes.artwork.url.replace('{w}', '400').replace('{h}', '400')
    : undefined);

const getArtistName = (track) =>
  track?.subtitle ||
  track?.attributes?.artistName ||
  track?.attributes?.name;

const ArtistCard = ({ track }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
      onClick={() => navigate(`/artists/${getArtistId(track)}`)}
    >
      <img alt="artist_img" src={getArtistImage(track) || '/default-image.png'} className="w-full h-56 rounded-lg" />
      <p className="mt-4 font-semibold text-lg text-white truncate">
        {getArtistName(track)}
      </p>
    </div>
  );
};

export default ArtistCard;