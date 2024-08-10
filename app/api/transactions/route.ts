import { NextResponse } from 'next/server'
import { addTransactionRedis, getTransactionRedis, removeTransactionRedis } from '@/lib/redis'
import { auth } from '@clerk/nextjs/server';
import { Transaction } from '@/lib/type';



// GET: Fetch all transactions
export async function GET() {
  try {
    // Fetch all transactions from the database
    // const transactions = await prisma.transaction.findMany()
    const { userId } = await auth();
    if (!userId) {
      throw new Error('User ID is null');
    }
    const transactions = await getTransactionRedis(userId)

    // console.log('All transactions:', transactions)

    return NextResponse.json(transactions)
  } catch (error) {
    console.error('Error fetching transactions:', error)
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 })
  }
}

// POST: Add a new transaction
export async function POST(request: Request) {
  try {
    // Parse the transaction data from the request
    const { userId } = await auth();
    if (!userId) {
      throw new Error('User ID is null');
    }
    const transaction : Transaction = await request.json()

    const newTransaction = await addTransactionRedis(transaction, userId)

    // Respond with the newly created transaction
    return NextResponse.json({ success: true, transaction: newTransaction })
  } catch (error) {
    console.error('Error adding transaction:', error)
    return NextResponse.json({ error: 'Failed to add transaction' }, { status: 500 })
  }
}


// DELETE: Delete a transaction
export async function DELETE(request: Request) {
  try {
    // Parse the transaction ID from the request
    const { userId } = await auth();
    if (!userId) {
      throw new Error('User ID is null');
    }

    const transactionId = await request.json()

    const result = await removeTransactionRedis(transactionId, userId)

    return NextResponse.json({ success: true, result })
    
  } catch (error) {
    console.error('Error deleting transaction:', error)
    return NextResponse.json({ error: 'Failed to delete transaction' }, { status: 500 })
  }
}