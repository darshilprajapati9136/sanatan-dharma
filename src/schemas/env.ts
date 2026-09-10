import {z} from 'zod';

export const clientEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_SITE_NAME: z.string().min(1).default('Sanatan Dharma'),
  NEXT_PUBLIC_DEFAULT_LOCALE: z.enum(['en', 'hi']).default('en'),
  NEXT_PUBLIC_FEATURE_ASK_DHARMA: z
    .enum(['true', 'false'])
    .default('false')
    .transform((value) => value === 'true')
});

export const serverEnvSchema = clientEnvSchema.extend({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  DATABASE_URL: z.string().min(1).optional(),
  SUPABASE_URL: z.string().url().optional(),
  SUPABASE_ANON_KEY: z.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  AI_API_KEY: z.string().optional()
});

export type ClientEnv = z.infer<typeof clientEnvSchema>;
export type ServerEnv = z.infer<typeof serverEnvSchema>;