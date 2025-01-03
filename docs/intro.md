# Financial Tracker App  

A simple and efficient Financial Tracker application built using **Next.js**, **Zustand** for state management, and **Redis** for backend caching and storage.

---

## Features  
- Add and delete transaction.  
- Display transaction history on Graph
- Real-time updates with efficient state management using Zustand.  
- Persistent task storage with Redis.

---

## Tech Stack  


### State Management  
- **Zustand**: For state management.

### Database  
- **Prisma**: For database operations.
- **Redis**: For caching and storing data.
- **Upstash**: For Redis as a service.

### Frontend  
- **Next.js**: For building server-side rendered (SSR) and static site generation (SSG) applications.
- **Tailwind CSS**: For styling.
- **Framer Motion**: For animations.
- **Clerk**: For authentication and authorization.
- **Radix UI**: For building accessible and custom React components.
- **LUCIDE**: For icons.

### Packages Manager  
- **pnpm**

### Performance Test
- **Lighthouse**

---

## Demo  
[Live Demo](https://finance-tracker-ochre-phi.vercel.app/) 

---

## Installation  

### Prerequisites  
- Node.js (v16 or later)  
- Require Upstash environment variable.

### Steps  
1. Clone the repository:  
   ```bash
   git clone https://github.com/Navong/Financial-Tracker.git
   cd Financial-Tracker
   ```

2. Install dependencies:  
   ```bash
   pnpm install
   ```

3. Set up environment variables:  
   Create a `.env.local` file in the root directory and add the following:  
   ```env
    UPSTASH_REDIS_REST_URL=""
    UPSTASH_REDIS_REST_TOKEN=""
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
    CLERK_SECRET_KEY=""
   ```

4. Start the development server:  
   ```bash
   pnpm dev
   ```

5. Visit the app at `http://localhost:3000`.

---

## Usage  

### Adding a Transaction  
- Enter a transaction name and amount in the input fields and click "Add Transaction."

### Deleting a Transaction  
- Click the delete icon next to a transaction to remove it permanently.  

### Filtering Transactions  
- Select a category from the dropdown menu to view only transactions of that category.  

---

## Project Architecture  

```
├── app
│   ├── actions.ts
│   ├── add-transaction
│   │   └── page.tsx
│   ├── api                 # API routes
│   │   └── transactions
│   ├── charts
│   │   └── page.tsx
│   ├── components
│   ├── layout.tsx
│   ├── page.tsx
│   └── transactions
│       └── page.tsx
├── components              # Reusable UI components
├── docs
│   └── intro.md
├── lib
│   ├── dumpData.ts
│   ├── redis.ts
│   ├── store.ts            # Zustand state management
│   ├── type.ts
│   └── utils.ts
```
---

## State Management (Zustand)  

The app uses Zustand for global state management:  

- **Transactions Store**:  
  ```javascript
  export const useTransactionStore = create<TransactionStore>(
    (set, get) => ({
      transactions: [],
      addTransaction: (transaction: Transaction) => {
        const newTransaction = { ...transaction, id: (get().transactions.length + 1).toString() };
        set((state) => ({
          transactions: [
            newTransaction,
            ...state.transactions,
          ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
        }));
      },
      fetchTransactions: async () => {
        const response = await fetch('/api/transactions');
        const transactions = await response.json();
        // React Query hook

        set({
          transactions: transactions.sort((a: Transaction, b: Transaction) =>
            new Date(b.date).getTime() - new Date(a.date).getTime(),
          ),
        });
      },

      // delete transaction
      removeTransaction: (transactionId: string) => {
        console.log(transactionId);
        set((state) => ({
          transactions: state.transactions.filter((transaction) => transaction.id !== transactionId),
        }));
        console.log('After Remove:', get().transactions);
      },
    }),
  );

---

## Redis Integration  

Redis is used to store tasks persistently.  

### Redis Configuration  
Set up a Redis server and connect it in the API routes:  
```javascript
import { Redis } from '@upstash/redis'
import { Transaction } from './type';

// Initialize Redis connection
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,  
  token: process.env.UPSTASH_REDIS_REST_TOKEN! 
})
```

### API Example  
**Fetch all Transaction**:  
```javascript
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error('User ID is null');
    }
    const transactions = await getTransactionRedis(userId)


    return NextResponse.json(transactions)
  } catch (error) {
    console.error('Error fetching transactions:', error)
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 })
  }
}
```

**Create new Transaction**:  
```javascript
export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error('User ID is null');
    }
    const transaction : Transaction = await request.json()

    const newTransaction = await addTransactionRedis(transaction, userId)

    return NextResponse.json({ success: true, transaction: newTransaction })
  } catch (error) {
    console.error('Error adding transaction:', error)
    return NextResponse.json({ error: 'Failed to add transaction' }, { status: 500 })
  }
}
```

**Delete Transaction**:  
```javascript
export async function DELETE(request: Request) {
  try {
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
```

---

## API Reference  

### `GET /api/transactions`  
**Description**: Fetches the list of transactions for the authenticated user.  
**Request**: Header with Authorization (A valid User ID is required to identify the user.) 
**Response**:  
```json
[
  {
    "id": "txn_123",
    "amount": 100,
    "date": "2025-01-01",
    "description": "Purchase at Store A"
  },
  {
    "id": "txn_124",
    "amount": 50,
    "date": "2025-01-02",
    "description": "Purchase at Store B"
  }
]
```

### `POST /api/transactions`  
**Description**: Add a new transactions.   
**Request**: Header with Authorization (A valid User ID is required to identify the user.)    
**Request Body**:  
```json
{
  "id": "txn_125",
  "amount": 200,
  "date": "2025-01-03",
  "description": "Payment for subscription"
}
```

**Response**:  
```json
{
  "success": true,
  "transaction": {
    "id": "txn_125",
    "amount": 200,
    "date": "2025-01-03",
    "description": "Payment for subscription"
  }
}
```

---
## License  
This project is licensed under the MIT License.
