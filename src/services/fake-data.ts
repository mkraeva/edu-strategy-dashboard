export interface ProgramBudget {
  program: string;
  budget: number;
}

export const fakeData: ProgramBudget[] = [
  {program: 'Program 1', budget: 15000 },
  {program: 'Program 2', budget: 5000 },
  {program: 'Program 3', budget: 31000 },
];

export async function fetchFakeData() {
  return Promise.resolve(fakeData);
}
