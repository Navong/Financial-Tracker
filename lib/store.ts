import { create } from 'zustand'
import { Transaction } from './dumpData'

interface TransactionStore {
  transactions: Transaction[]
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void
  fetchTransactions: () => Promise<void>
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
    set({ transactions: transactions.sort((a: Transaction, b: Transaction) => new Date(b.date).getTime() - new Date(a.date).getTime()) })
  }
}))

