import '@testing-library/jest-dom';


const bulbasaurMock = {
  name: 'Bulbasaur',
  types: ['Grass', 'Poison'],
};

const charmanderMock = {
  name: 'Charmander',
  types: ['Fire'],
};

const squirtleMock = {
  name: 'Squirtle',
  types: ['Water'],
};

describe('Pokemon Type Tests', () => {
  it('should have correct types for Bulbasaur', () => {
    expect(bulbasaurMock.types).toContain('Grass');
    expect(bulbasaurMock.types).toContain('Poison');
  });

  it('should have correct type for Charmander', () => {
    expect(charmanderMock.types).toContain('Fire');
  });

  it('should have correct type for Squirtle', () => {
    expect(squirtleMock.types).toContain('Water');
  });
});
