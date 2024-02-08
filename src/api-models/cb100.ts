export type itemRequest = {};
export type itemResponse = [
  {
    code: string;
    name: string;
    states: {
      code: string;
      name: string;
      cities: {
        name: string;
        population: string;
      }[];
    }[];
    id: string;
  }
];
