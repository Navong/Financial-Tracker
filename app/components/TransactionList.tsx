'use client'

import { useEffect } from 'react'
import { useTransactionStore } from '@/lib/store'
import { TransactionItem } from './TransactionItem'
import { AnimatePresence, motion } from 'framer-motion'

export function TransactionList() {
  const { transactions, fetchTransactions } = useTransactionStore()

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  if (transactions.length === 0) {
    return <div className="text-center py-4">No transactions found.</div>
  }

  return (
    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-4">
      <AnimatePresence>
        {transactions.map((transaction) => (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <TransactionItem transaction={transaction} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

