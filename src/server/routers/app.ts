import { protectedProcedure, router } from '@/server/trpc';

export const appRouter = router({
  random: protectedProcedure.query(() => {
    return Math.random();
  }),
});

export type AppRouter = typeof appRouter;
