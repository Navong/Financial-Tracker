import { Card, CardContent } from '@/components/ui/card'
import { Transaction } from '@/lib/dumpData'

export function TransactionItem({ transaction }: { transaction: Transaction }) {
  return (
    <Card className="w-full mb-4">
      <CardContent className="flex justify-between items-center p-4">
        <div>
          <h3 className="font-semibold">{transaction.description}</h3>
          <p className="text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString()}</p>
        </div>
        <div className={`text-lg font-bold ${transaction.type === 'expense' ? 'text-red-500' : 'text-green-500'}`}>
          {transaction.type === 'expense' ? '-' : '+'}${transaction.amount.toFixed(2)}
        </div>
      </CardContent>
    </Card>
  )
}

