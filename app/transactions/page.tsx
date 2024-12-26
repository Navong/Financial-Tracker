import { TransactionForm } from '../components/TransactionForm'
import { TransactionList } from '../components/TransactionList'

export default function Transactions() {
  return (
    <div className="w-full space-y-8 pt-20">
      {/* <h1 className="text-3xl font-bold">Transactions</h1> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Add New Transaction</h2>
          <TransactionForm />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Transaction History</h2>
          <TransactionList />
        </div>
      </div>
    </div>
  )
}

