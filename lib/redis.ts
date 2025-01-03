import { Redis } from '@upstash/redis'
import { Transaction } from './type';

// Initialize Redis connection
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,  // Ensure your Upstash Redis URL
  token: process.env.UPSTASH_REDIS_REST_TOKEN! // Ensure your Redis Token
})

// Function to fetch all transactions for a given userId

export async function getTransactionRedis(userId: string) {
  try {
    // Fetch all transactions for the given userId from the Redis list
    const transactions = await redis.lrange(`transactions:${userId}`, 0, -1);

    // Check for cache hit or miss
    const isCacheHit = transactions.length > 0;

    if (isCacheHit) {
      console.log('Cache hit for user:', userId);
    } else {
      console.log('Cache miss for user:', userId);
    }

    // Parse the transactions from JSON format
    const parsedTransactions = transactions.map((transaction) =>
      transaction
    );

    return parsedTransactions;
  } catch (error) {
    console.error('Error fetching transactions from Redis:', error);
    // Throw a meaningful error for the calling function to handle
    throw new Error('Failed to fetch transactions from Redis. Please try again.');
  }
}




// Function to add a new transaction to Redis for a given userId
export async function addTransactionRedis(transaction: Transaction, userId: string) {
  try {
    // Log the transaction for debugging
    console.log('Attempting to add transaction:', transaction);

    // Add transaction to the Redis list 'transactions:<userId>'
    await redis.lpush(`transactions:${userId}`, JSON.stringify(transaction));

    // Confirm success
    console.log('Transaction added successfully to Redis.');
  } catch (error) {
    console.error('Error adding transaction to Redis:', error);
    // Throw a meaningful error for the calling function to handle
    throw new Error('Failed to add transaction to Redis. Please try again.');
  }
}

// Function to remove a transaction from Redis for a given userId
export async function removeTransactionRedis(transactionId: string, userId: string) {
  try {
    // Remove transaction from the Redis list 'transactions:<userId>'
    await redis.lrem(`transactions:${userId}`, 0, transactionId);

    // Confirm success
    console.log('Transaction removed successfully from Redis.');
  } catch (error) {
    console.error('Error removing transaction from Redis:', error);
    // Throw a meaningful error for the calling function to handle
    throw new Error('Failed to remove transaction from Redis. Please try again.');
  }
}
