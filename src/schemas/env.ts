import {z} from 'zod';

export const clientEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_SITE_NAME: z.string().min(1).default('Sanatan Dharma'),
  NEXT_PUBLIC_DEFAULT_LOCALE: z.enum(['en', 'hi']).default('en'),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().min(1).optional(),
  // Legacy alias for the publishable key. Prefer NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).optional(),
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
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
  AI_API_KEY: z.string().min(1).optional()
});

export type ClientEnv = z.infer<typeof clientEnvSchema>;
export type ServerEnv = z.infer<typeof serverEnvSchema>;

export function getSupabasePublishableKey(): string | undefined {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && getSupabasePublishableKey());
}

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}