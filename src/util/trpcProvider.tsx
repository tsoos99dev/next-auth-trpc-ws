'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  httpBatchLink,
  getFetch,
  loggerLink,
  createWSClient,
  wsLink,
} from '@trpc/client';
import { useState } from 'react';
import { trpc } from './trpc';
import { AppRouter } from '@/server/routers/app';

function getBaseUrl() {
  if (typeof window !== 'undefined')
    // browser should use relative path
    return '';
  if (process.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`;
  if (process.env.RENDER_INTERNAL_HOSTNAME)
    // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

interface Props {
  children: React.ReactNode;
}

export function TrpcProvider({ children }: Props) {
  const wsUrl = 'ws://localhost:3001';
  if (wsUrl === undefined) throw new Error('Missing websocket server URL');

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { staleTime: 5000 } },
      })
  );

  const [wsClient] = useState(() =>
    createWSClient({
      url: wsUrl,
    })
  );

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        loggerLink({
          enabled: (opts) =>
            (process.env.NODE_ENV === 'development' &&
              typeof window !== 'undefined') ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        wsLink<AppRouter>({
          client: wsClient,
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          fetch: async (input, init?) => {
            const fetch = getFetch();
            return fetch(input, {
              ...init,
              credentials: 'include',
            });
          },
        }),
      ],
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
