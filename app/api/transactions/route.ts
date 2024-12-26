import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

// Initialize Prisma client
const prisma = new PrismaClient()

// GET: Fetch all transactions
export async function GET() {
  try {
    // Fetch all transactions from the database
    const transactions = await prisma.transaction.findMany()

    console.log('All transactions:', transactions)
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
    const transaction = await request.json()

    console.log(transaction)

    // Create a new transaction in the database
    const newTransaction = await prisma.transaction.create({
      data: {
        amount: transaction.amount,
        description: transaction.description,
        type: transaction.type,
        date: new Date(transaction.date || Date.now()), // use current date if not provided
      },
    })

    // Respond with the newly created transaction
    return NextResponse.json({ success: true, transaction: newTransaction })
  } catch (error) {
    console.error('Error adding transaction:', error)
    return NextResponse.json({ error: 'Failed to add transaction' }, { status: 500 })
  }
}
