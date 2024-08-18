export interface Attack {
    name: string;
    type: string;
    damage: number;
  }
  
  export interface Attacks {
    fast: Attack[];
    special: Attack[];
  }
  
  export interface Evolution {
    id: string;
    name: string;
    types: string[];
  }
  
  export interface Pokemon {
    id: string;
    name: string;
    types: string[];
    attacks: Attacks;
    evolutions?: Evolution[];
  }
  