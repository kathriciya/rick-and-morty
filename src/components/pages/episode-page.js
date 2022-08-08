import React from 'react';
import { useParams } from 'react-router-dom';
import CharacterList from '../character-list/character-list';
import EpisodeInfo from '../episode-info/episode-info';

const EpisodePage = ({ visibleSeason }) => {
  const { episodeId } = useParams();
  const episode = visibleSeason.find((item) => item.episode === episodeId);
  return (
    <>
      <EpisodeInfo episode={episode} />
      <CharacterList episode={episode} />
    </>
  );
};

export default EpisodePage;
