export type Patient = {
  id: number;
  veterinarian: number;
  species: "cat" | "dog";
  name: string;
  DoB: Date | string;
  weight: number;
  idealWeight?: number;
  created: string;
  updated: string;
};
