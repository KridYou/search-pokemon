import React from 'react';

import SearchInput from '../components/SearchInput';
import PokemonResult from '../components/PokemonResult';

const Home: React.FC = () => {
  return (
    <div>
      <SearchInput />
      <PokemonResult />
    </div>
  )
};

export default Home;
