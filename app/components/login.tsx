"use client";

import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

export default function LogoutButton() {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push('/login'); // Navigate to login page after logout
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-4xl font-bold">Logout</h1>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
