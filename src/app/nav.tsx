'use client';

import { signOut } from 'next-auth/react';

export default function Nav() {
  return (
    <div className='flex items-center justify-end p-4 bg-slate-800'>
      <button
        className='text-slate-50 font-bold hover:bg-slate-50/20 rounded px-4 py-2'
        onClick={() => signOut()}
      >
        Log out
      </button>
    </div>
  );
}
