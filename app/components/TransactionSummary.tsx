'use client'

import { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useTransactionStore } from '@/lib/store'

export function TransactionSummary() {
  const { transactions, fetchTransactions } = useTransactionStore()

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  console.log('transactions', transactions)

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIncome - totalExpenses

  console.log('totalIncome', totalIncome)
  console.log('totalExpenses', totalExpenses)
  console.log('balance', balance)


  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Total Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">${balance.toFixed(2)}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Income</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-green-600">${totalIncome.toFixed(2)}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-red-600">${totalExpenses.toFixed(2)}</p>
        </CardContent>
      </Card>
    </>
  )
}

