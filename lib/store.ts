import { create } from 'zustand'
import { Transaction } from './type'

interface TransactionStore {
  transactions: Transaction[]
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void
  fetchTransactions: () => Promise<void>
  removeTransaction: (transactionId: string) => void
}

export const useTransactionStore = create<TransactionStore>((set, get) => ({
  transactions: [],
  addTransaction: (transaction) => {
    const newTransaction = { ...transaction, id: (get().transactions.length + 1).toString() }
    set((state) => ({
      transactions: [newTransaction, ...state.transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }))
  },
  fetchTransactions: async () => {
    const response = await fetch('/api/transactions')
    const transactions = await response.json()
    // React Query hook
    set({ transactions: transactions.sort((a: Transaction, b: Transaction) => new Date(b.date).getTime() - new Date(a.date).getTime()) })
  },

  //delete transaction
  removeTransaction: (transactionId: string) => {
    console.log(transactionId);
    set((state) => ({
      transactions: state.transactions.filter((transaction) => transaction.id !== transactionId)
    }));
    console.log('After Remove:', get().transactions);
  }
}))

