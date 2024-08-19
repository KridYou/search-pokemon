import { gql, useQuery } from '@apollo/client';
import { Autocomplete, Box, Button, Container, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

const GET_POKEMON_NAMES = gql`
  query GetPokemonNames {
    pokemons(first: 100) {
      name
    }
  }
`;

export default function SearchInput() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    if (router.query.name) {
      setSearchTerm(router.query.name as string);
      setSelectedOption(router.query.name as string);
    }
  }, [router.query.name]);

  const { loading, error, data } = useQuery(GET_POKEMON_NAMES, {
    fetchPolicy: 'cache-and-network',
  });

  const pokemonNames = data?.pokemons.map((pokemon: { name: string }) => pokemon.name) || [];

  const handleSearch = () => {
    if (selectedOption) {
      router.push(`/?name=${selectedOption}`);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading Pokémon names.</p>;

  return (
    <Container maxWidth="sm">
      <Box mt={4} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" gutterBottom>
          Search Pokémon
        </Typography>
        <Autocomplete
          freeSolo
          fullWidth
          value={selectedOption}
          options={pokemonNames}
          onChange={(event, newValue) => setSelectedOption(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Pokémon Name"
              variant="outlined"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          )}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{ mt: 2 }}
        >
          Search
        </Button>
      </Box>
    </Container>
  );
}
