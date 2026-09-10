import {serverEnvSchema} from '@/schemas/env';

const parsed = serverEnvSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid server environment variables', parsed.error.flatten().fieldErrors);
  throw new Error('Invalid server environment variables');
}

export const env = parsed.data;