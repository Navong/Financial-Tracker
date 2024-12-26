import { Redis } from '@upstash/redis'
import { Transaction } from '@/lib/dumpData'

// Initialize Redis connection
export const redis = new Redis({
  url: process.env.REDIS_URL!,  // Ensure your Upstash Redis URL
  token: process.env.REDIS_TOKEN! // Ensure your Redis Token
})

// Function to fetch all transactions
export async function getTransactions(): Promise<Transaction[]> {
  try {
    // Fetch transactions from Redis list 'transactions'
    const transactions = await redis.lrange('transactions', 0, -1)

    // Parse each transaction from JSON
    return transactions.map((t) => JSON.parse(t))
  } catch (error) {
    console.error('Error fetching transactions from Redis:', error)
    throw new Error('Failed to fetch transactions')
  }
}

// Function to add a new transaction to Redis
export async function addTransaction(transaction: Transaction) {
  try {
    // Add transaction to the Redis list 'transactions'
    await redis.lpush('transactions', JSON.stringify(transaction))
  } catch (error) {
    console.error('Error adding transaction to Redis:', error)
    throw new Error('Failed to add transaction')
  }
}
