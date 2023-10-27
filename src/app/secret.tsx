'use client';

import { trpc } from '@/util/trpc';

export default function SecretView() {
  const secret = trpc.random.useQuery();

  if (secret.isError) {
    return <span className='font-bold text-red-400'>Error</span>;
  }

  if (secret.isLoading) {
    return <span className='font-bold'>Loading...</span>;
  }

  return <span className='font-bold'>Super secret: {secret.data}</span>;
}
