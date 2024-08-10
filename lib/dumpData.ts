export interface Transaction {
    id: string;
    description: string;
    amount: number;
    type: 'income' | 'expense';
    date: string;
  }
  
  // export const dumpTransactions: Transaction[] = [
  //   {
  //     id: '1',
  //     description: 'Salary',
  //     amount: 5000,
  //     type: 'income',
  //     date: '2024-10-01T09:00:00Z',
  //   },
  //   {
  //     id: '2',
  //     description: 'Rent',
  //     amount: 1500,
  //     type: 'expense',
  //     date: '2024-11-02T10:00:00Z',
  //   },
  //   {
  //     id: '3',
  //     description: 'Groceries',
  //     amount: 200,
  //     type: 'expense',
  //     date: '2023-06-03T14:30:00Z',
  //   },
  //   {
  //     id: '4',
  //     description: 'Freelance Work',
  //     amount: 1000,
  //     type: 'income',
  //     date: '2023-06-04T16:00:00Z',
  //   },
  //   {
  //     id: '5',
  //     description: 'Utilities',
  //     amount: 150,
  //     type: 'expense',
  //     date: '2023-06-05T11:00:00Z',
  //   },
  // ];
  
  