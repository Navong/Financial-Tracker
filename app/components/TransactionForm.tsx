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

export function TransactionForm() {
    const [description, setDescription] = useState('')
    const [amount, setAmount] = useState('')
    const [type, setType] = useState<'income' | 'expense'>('expense')
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [isLoading, setIsLoading] = useState(false)
    const addTransaction = useTransactionStore(state => state.addTransaction)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        if (date) {
            const transaction = { description, amount: parseFloat(amount), type, date: date.toISOString() }
            await fetch('/api/transactions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(transaction),
            })
            addTransaction(transaction)
            setIsLoading(false)
            setDescription('')
            setAmount('')
            setType('expense')
            setDate(new Date())
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="description">Description</Label>
                <Input
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div>
                <Label htmlFor="amount">Amount</Label>
                <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
            </div>
            <div>
                <Label htmlFor="type">Type</Label>
                <Select value={type} onValueChange={(value: 'income' | 'expense') => setType(value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select transaction type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="expense">Expense</SelectItem>
                        <SelectItem value="income">Income</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label htmlFor="date">Date</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <Button type="submit" disabled={isLoading} className="w-full" size="lg">
                {isLoading ? 'Adding...' : 'Add Transaction'}
            </Button>
        </form>
    )
}

