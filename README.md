# next-auth-trpc-ws

NextAuth tRPC Websocket example

## Getting Started

Create a .env file:

```
NEXTAUTH_URL='http://localhost:3000'
NEXTAUTH_SECRET='<your-secret>'

GOOGLE_CLIENT_ID='<your-client-id>'
GOOGLE_CLIENT_SECRET='<your-client-secret>'
```

Run the development server:

```bash
npm i
npm run dev
```

Run the WebSocket server:

```bash
npm run dev:wss
```

Open [http://localhost:3000](http://localhost:3000).
