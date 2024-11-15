import { env } from '@repo/env';
import { init } from '@sentry/nextjs';

// const opts = {
//   dsn: env.NEXT_PUBLIC_SENTRY_DSN,
// };

const optsServer = {
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: process.env.NODE_ENV !== 'test',

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // Uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: process.env.NODE_ENV === 'development'
};

const optsEdge = {
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: process.env.NODE_ENV !== 'test',

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
};

export const initializeSentry = () => {
  if (env.NEXT_RUNTIME === 'nodejs') {
    init(optsServer);
  }

  if (env.NEXT_RUNTIME === 'edge') {
    init(optsEdge);
  }

  // if (process.env.NEXT_RUNTIME === 'nodejs') {
  //   await import('./sentry.server.config');
  // }

  // if (process.env.NEXT_RUNTIME === 'edge') {
  //   await import('./sentry.edge.config');
  // }
};
