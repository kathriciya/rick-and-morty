import React from 'react';
import { useParams } from 'react-router-dom';
import CharacterList from '../character-list/character-list';
import EpisodeInfo from '../episode-info/episode-info';
import Layout from '../layout/layout';

const EpisodePage = ({ visibleSeason }) => {
  const { episodeId } = useParams();
  const episode = visibleSeason.find((item) => item.episode === episodeId);
  return (
    <Layout title='Episode information'>
      <EpisodeInfo episode={episode} />
      <CharacterList episode={episode} />
    </Layout>
  );
};

export default EpisodePage;
