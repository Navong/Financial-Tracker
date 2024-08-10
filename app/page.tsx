import Footer from './components/Footer'
import { TransactionChart } from './components/TransactionChart'
import { TransactionSummary } from './components/TransactionSummary'


export default function Dashboard() {

  return (
    <div className="w-full space-y-6 pt-20">
      {/* <h1 className="text-3xl font-bold">Dashboard</h1> */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        <TransactionSummary />
      </div>
      <div className="w-full">
        <TransactionChart />
      </div>
      <div>
      </div>
    </div>
  )
}

