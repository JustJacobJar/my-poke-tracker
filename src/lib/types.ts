export interface IPokeTeam {
  id?: string;
  name: string;
  pokemon: Array<string>;
  description: string | null;
  authorId?: string;
}

export type FormState = {
  message: string;
  success: boolean;
};

export interface IPokeCardInfo {
  name: string;
  sprites: { front_default: string };
  types: {
    slot: number;
    type: {
      name: string;
    };
  }[];
}
