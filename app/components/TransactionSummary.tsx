'use client'

import { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useTransactionStore } from '@/lib/store'
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion'
import { useTheme } from 'next-themes'

const AnimatedValue = ({ value }: { value: number }) => {
  const springValue = useSpring(0, { stiffness: 100, damping: 30 })
  const displayValue = useMotionValue(0)
  const rounded = useTransform(displayValue, (latest) => Math.round(latest * 100) / 100)

  useEffect(() => {
    springValue.set(value)
  }, [springValue, value])

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      displayValue.set(latest)
    })
    return unsubscribe
  }, [springValue, displayValue])

  return <motion.span>{rounded}</motion.span>
}

export function TransactionSummary() {
  const { transactions, fetchTransactions } = useTransactionStore()
  const { theme } = useTheme() // Get current theme

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIncome - totalExpenses

  return (
    <>
      <Card
        className={`w-full ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
      >
        <CardHeader className=''>
          <CardTitle>Total Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="lg:text-xl font-bold text-lg">
            $<AnimatedValue value={balance} />
          </p>
        </CardContent>
      </Card>
      <Card
        className={`w-full ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
      >
        <CardHeader className=' '>
          <CardTitle>Total Income</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="lg:text-xl font-bold text-lg text-green-600">
            $<AnimatedValue value={totalIncome} />
          </p>
        </CardContent>
      </Card>
      <Card
        className={`w-full ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
      >
        <CardHeader className=''>
          <CardTitle>Total Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="lg:text-xl font-bold text-lg text-red-600">
            $<AnimatedValue value={totalExpenses} />
          </p>
        </CardContent>
      </Card>
    </>
  )
}