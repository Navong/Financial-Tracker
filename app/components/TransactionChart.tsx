'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { useTransactionStore } from '@/lib/store'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'

const AnimatedBar = ({ x, y, width, height, fill }: any) => {
  const [animatedStyle, setAnimatedStyle] = useState({ y: y || 0, height: 0 })

  useEffect(() => {
    setAnimatedStyle({ y, height })
  }, [y, height])

  return (
    <motion.rect
      x={x}
      width={width}
      fill={fill}
      initial={{ y: y + height, height: 0 }}
      animate={animatedStyle}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    />
  )
}

export function TransactionChart() {
  const { transactions, fetchTransactions } = useTransactionStore()
  const [chartData, setChartData] = useState<any[]>([])
  const { theme } = useTheme()

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  useEffect(() => {
    const newChartData = transactions.reduce((acc: any[], transaction) => {
      const date = new Date(transaction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      const existingDate = acc.find(item => item.date === date)
      if (existingDate) {
        existingDate[transaction.type] += Number(transaction.amount) || 0
      } else {
        acc.push({
          date,
          income: transaction.type === 'income' ? Number(transaction.amount) || 0 : 0,
          expense: transaction.type === 'expense' ? Number(transaction.amount) || 0 : 0,
        })
      }
      return acc
    }, [])

    setChartData(newChartData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()))
  }, [transactions])

  const barColorIncome = theme === 'dark' ? '#34d399' : '#4ade80'; // Green for income
  const barColorExpense = theme === 'dark' ? '#ef4444' : '#f87171'; // Red for expense

  return (
    <motion.div
      className="container mx-auto p-4 lg:p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className={`shadow-lg ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
        <CardHeader>
          <CardTitle className="text-lg lg:text-xl">Transaction Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] md:h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#444' : '#ddd'} />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: theme === 'dark' ? '#fff' : '#333' }} />
                <YAxis tick={{ fill: theme === 'dark' ? '#fff' : '#333' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill={barColorIncome} shape={<AnimatedBar />} />
                <Bar dataKey="expense" fill={barColorExpense} shape={<AnimatedBar />} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}