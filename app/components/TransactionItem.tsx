"use client";

import { Card, CardContent } from '@/components/ui/card'
import { Transaction } from '@/lib/type'
import { useTheme } from 'next-themes'
import { TrashIcon } from 'lucide-react'
import { useTransactionStore } from '@/lib/store';
import { useState } from 'react';

export function TransactionItem({ transaction }: { transaction: Transaction }) {
  const { theme } = useTheme()
  const [isLoading, setIsLoading] = useState(false)


  const removeTransaction = useTransactionStore(state => state.removeTransaction)

  const handleRemoveTransaction = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {

      // Delete from Redis first
      const response = await fetch('/api/transactions', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction),
      })

      if (!response.ok) {
        throw new Error('Failed to delete transaction')
      }
      setIsLoading(false)
      // Delete from local state first
      removeTransaction(transaction.id)

      // If Redis deletion was successful, update local state
    } catch (error) {
      console.error('Error removing transaction:', error)
      // You might want to add toast notification here for error handling
    }
  }


  return (
    <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} w-full mb-4`}>
      <CardContent className="flex justify-between items-center p-4">
        <div>
          <h3 className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>{transaction.description}</h3>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
            {new Date(transaction.date).toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center">
          <div className={`text-lg font-bold ${transaction.type === 'expense' ? 'text-red-500' : 'text-green-500'}`}>
            {transaction.type === 'expense' ? '-' : '+'}${transaction.amount ? transaction.amount.toFixed(2) : '0.00'}
          </div>
          <button
            disabled={isLoading}
            className="ml-2 p-1 rounded-full transition-colors hover:bg-red-500 hover:text-white"
            onClick={handleRemoveTransaction}
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
