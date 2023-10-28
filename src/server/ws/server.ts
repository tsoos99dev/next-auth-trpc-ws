import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { appRouter } from '@/server/routers/app';
import { applyWSSHandler } from '@trpc/server/adapters/ws';
import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';
import ws from 'ws';

const dev = process.env.NODE_ENV !== 'production';
const port = 3001;

const wss = new ws.Server({ port });
const handler = applyWSSHandler({
  wss,
  router: appRouter,
  createContext: async ({ req, res }) => {
    let session = null;

    // How would I get the session here?

    try {
      session = await getSession({ req });
      console.log(session);
    } catch (e) {
      console.log(e);
    }

    return { req, res, session };
  },
});

wss.on('connection', (ws) => {
  console.log(`➕➕ Connection (${wss.clients.size})`);
  ws.once('close', () => {
    console.log(`➖➖ Connection (${wss.clients.size})`);
  });
});

wss.on('error', (error) => {
  console.log(error);
});

console.log('✅ WebSocket Server listening on ws://localhost:3001');

process.on('SIGTERM', () => {
  console.log('SIGTERM');
  handler.broadcastReconnectNotification();
  wss.close();
  process.exit(0);
});
