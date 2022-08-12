import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectEpisodesData } from '../../../store/episodes';
import CharacterList from '../../character-list/character-list';
import EpisodeInfo from '../../episode-info/episode-info';
import Layout from '../../layout/layout';

const EpisodePage = () => {
  const episodesRedux = useSelector(selectEpisodesData);
  const { episodeId } = useParams();
  const episode = episodesRedux.find((item) => item.id === Number(episodeId));
  return (
    <Layout title='Episode information'>
      <EpisodeInfo episode={episode} />
      <CharacterList episode={episode} />
    </Layout>
  );
};

export default EpisodePage;
