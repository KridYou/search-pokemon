import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { Container, Typography, List, ListItem, Button, CircularProgress, Paper, Divider } from '@mui/material';

const GET_POKEMON_BY_NAME = gql`
  query GetPokemonByName($name: String!) {
    pokemon(name: $name) {
      id
      name
      types
      attacks {
        fast {
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }
      evolutions {
        id
        name
        types
      }
    }
  }
`;

interface Attack {
  name: string;
  type: string;
  damage: number;
}

export default function PokemonResult() {
  const router = useRouter();
  const { name } = router.query;

  const { loading, error, data } = useQuery(GET_POKEMON_BY_NAME, {
    variables: { name },
    skip: !name,
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <CircularProgress />;
  if (error || !data?.pokemon) return <Typography variant="h6" color="error">Not Found</Typography>;

  const { pokemon } = data;

  const handleEvolutionClick = (evolutionName: string) => {
    router.push(`/?name=${evolutionName}`);
  };

  return (
    <Container component={Paper} sx={{ padding: 3, marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        {pokemon.name}
      </Typography>
      <Typography variant="h6" color="textSecondary" paragraph>
        Types: {pokemon.types.join(', ')}
      </Typography>
      
      <Divider sx={{ marginY: 2 }} />

      <Typography variant="h6" gutterBottom>
        Fast Attacks:
      </Typography>
      <List>
        {pokemon.attacks.fast.map((attack: Attack) => (
          <ListItem key={attack.name}>
            <Typography variant="body1">
              {attack.name} ({attack.type}) - Damage: {attack.damage}
            </Typography>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ marginY: 2 }} />

      <Typography variant="h6" gutterBottom>
        Special Attacks:
      </Typography>
      <List>
        {pokemon.attacks.special.map((attack: Attack) => (
          <ListItem key={attack.name}>
            <Typography variant="body1">
              {attack.name} ({attack.type}) - Damage: {attack.damage}
            </Typography>
          </ListItem>
        ))}
      </List>

      {pokemon.evolutions && (
        <>
          <Divider sx={{ marginY: 2 }} />
          <Typography variant="h6" gutterBottom>
            Evolutions:
          </Typography>
          <List>
            {pokemon.evolutions.map((evolution: { id: string; name: string; types: string[] }) => (
              <ListItem key={evolution.id}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEvolutionClick(evolution.name)}
                >
                  {evolution.name} - Types: {evolution.types.join(', ')}
                </Button>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Container>
  );
}
