'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { useTransactionStore } from '@/lib/store'
import { motion } from 'framer-motion'

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

  return (
    <motion.div
      className="container mx-auto p-4 lg:p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg lg:text-xl">Transaction Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] md:h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#4ade80" shape={<AnimatedBar />} />
                <Bar dataKey="expense" fill="#f87171" shape={<AnimatedBar />} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}