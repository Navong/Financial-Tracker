// 'use server'

// import { revalidatePath } from 'next/cache'
// import { dumpTransactions, Transaction } from '@/lib/dumpData'

// export async function addTransaction(transaction: Omit<Transaction, 'id'>) {
//   const newTransaction: Transaction = {
//     ...transaction,
//     id: (dumpTransactions.length + 1).toString(),
//   }
//   dumpTransactions.push(newTransaction)
//   revalidatePath('/transactions')
//   revalidatePath('/charts')
// }

// export async function getTransactions(): Promise<Transaction[]> {
//   return dumpTransactions
// }

