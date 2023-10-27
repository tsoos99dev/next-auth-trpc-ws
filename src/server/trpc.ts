import { Context } from '@/server/context';
import { TRPCError, initTRPC } from '@trpc/server';
import { ZodError } from 'zod';

const t = initTRPC.context<Context>().create({
  errorFormatter(opts) {
    const { shape, error } = opts;
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
      },
    };
  },
});

const isAuthed = t.middleware((opts) => {
  const { ctx } = opts;
  if (typeof ctx.session?.user === 'undefined') {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  const user = ctx.session.user;

  return opts.next({
    ctx: {
      user,
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthed);

export const router = t.router;
export const procedure = t.procedure;
export const middleware = t.middleware;
export const mergeRouters = t.mergeRouters;
