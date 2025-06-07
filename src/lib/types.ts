export interface IPokeTeam {
  id?: string;
  name: string;
  pokemon: string[];
  description: string | null;
  authorId?: string;
}
