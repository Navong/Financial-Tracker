'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { useTransactionStore } from '@/lib/store'
import { useTheme } from 'next-themes'
import { Transaction } from '@/lib/type'

export function TransactionForm() {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState<'income' | 'expense'>('expense')
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isLoading, setIsLoading] = useState(false)
  const addTransaction = useTransactionStore(state => state.addTransaction)
  const { theme } = useTheme()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    if (date) {
      const transaction: Transaction = {
        id: crypto.randomUUID(),
        description,
        amount: parseFloat(amount),
        type,
        date: date.toISOString()
      }

      try {
        const response = await fetch('/api/transactions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(transaction),
        })
        
        if (!response.ok) throw new Error('Failed to add transaction')
        
        addTransaction(transaction)
        
        // Reset form
        setDescription('')
        setAmount('')
        setType('expense')
        setDate(new Date())
      } catch (error) {
        console.error('Error adding transaction:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label 
          htmlFor="description"
          className={`text-sm font-medium ${
            theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
          }`}
        >
          Description
        </Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className={cn(
            'w-full rounded-md',
            'transition-colors duration-200',
            theme === 'dark' 
              ? 'bg-gray-800 text-white border-gray-700 focus:border-blue-500'
              : 'bg-white text-gray-900 border-gray-200 focus:border-blue-500'
          )}
        />
      </div>

      <div className="space-y-2">
        <Label 
          htmlFor="amount"
          className={`text-sm font-medium ${
            theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
          }`}
        >
          Amount
        </Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className={cn(
            'w-full rounded-md',
            'transition-colors duration-200',
            theme === 'dark' 
              ? 'bg-gray-800 text-white border-gray-700 focus:border-blue-500'
              : 'bg-white text-gray-900 border-gray-200 focus:border-blue-500'
          )}
        />
      </div>

      <div className="space-y-2">
        <Label 
          htmlFor="type"
          className={`text-sm font-medium ${
            theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
          }`}
        >
          Type
        </Label>
        <Select value={type} onValueChange={(value: 'income' | 'expense') => setType(value)}>
          <SelectTrigger 
            className={cn(
              'w-full',
              theme === 'dark' 
                ? 'bg-gray-800 text-white border-gray-700' 
                : 'bg-white text-gray-900 border-gray-200'
            )}
          >
            <SelectValue placeholder="Select transaction type" />
          </SelectTrigger>
          <SelectContent className={
            theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'
          }>
            <SelectItem value="expense">Expense</SelectItem>
            <SelectItem value="income">Income</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label 
          htmlFor="date"
          className={`text-sm font-medium ${
            theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
          }`}
        >
          Date
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal',
                theme === 'dark' 
                  ? 'bg-gray-800 text-white border-gray-700 hover:bg-gray-700'
                  : 'bg-white text-gray-900 border-gray-200 hover:bg-gray-50',
                !date && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className={cn(
            "w-auto p-0",
            theme === 'dark' 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          )}>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              className={cn(
                'rounded-md border',
                theme === 'dark' 
                  ? 'bg-gray-800 text-white border-gray-700'
                  : 'bg-white text-gray-900 border-gray-200'
              )}
            />
          </PopoverContent>
        </Popover>
      </div>

      <Button 
        type="submit" 
        disabled={isLoading} 
        className={cn(
          'w-full transition-colors duration-200',
          theme === 'dark'
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        )}
        size="lg"
      >
        {isLoading ? 'Adding...' : 'Add Transaction'}
      </Button>
    </form>
  )
}