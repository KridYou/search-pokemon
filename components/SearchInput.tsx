import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState, useEffect, MouseEvent } from 'react';

export default function SearchInput() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (router.query.name) {
      setSearchTerm(router.query.name as string);
    }
  }, [router.query.name]);

  const handleSearch = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(`/?name=${searchTerm}`);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" gutterBottom>
          Search Pokémon
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          label="Pokémon Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
