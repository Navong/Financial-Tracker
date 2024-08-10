'use client'

import { useEffect, useState } from 'react'
import { useTransactionStore } from '@/lib/store'
import { TransactionItem } from './TransactionItem'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { CalendarIcon } from 'lucide-react'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function TransactionList() {
  const { transactions, fetchTransactions } = useTransactionStore()
  const { theme } = useTheme()
  const [dateFilter, setDateFilter] = useState('all')

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  const getFilteredTransactions = () => {
    if (dateFilter === 'all') return transactions

    const today = new Date()
    const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30))
    const sevenDaysAgo = new Date(today.setDate(today.getDate() - 7))
    
    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date)
      
      switch (dateFilter) {
        case 'today':
          return transactionDate.toDateString() === new Date().toDateString()
        case '7days':
          return transactionDate >= sevenDaysAgo
        case '30days':
          return transactionDate >= thirtyDaysAgo
        default:
          return true
      }
    })
  }

  const filteredTransactions = getFilteredTransactions()

  return (
    <div>
      <div className={`mb-4 flex items-center ${
        theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
      }`}>
        <CalendarIcon className="mr-2 h-4 w-4" />
        <Select
          value={dateFilter}
          onValueChange={setDateFilter}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Transactions</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="7days">Last 7 Days</SelectItem>
            <SelectItem value="30days">Last 30 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredTransactions.length === 0 ? (
        <div className={`text-center py-4 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          No transactions found for the selected period.
        </div>
      ) : (
        <div className={`
          space-y-4 
          max-h-[600px] 
          overflow-y-auto 
          pr-4
          ${theme === 'dark' ? 'scrollbar-dark' : 'scrollbar-light'}
        `}>
          <AnimatePresence mode="popLayout">
            {filteredTransactions.map((transaction) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <TransactionItem transaction={transaction} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}