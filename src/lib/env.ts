import {clientEnvSchema} from '@/schemas/env';

const parsed = clientEnvSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid client environment variables', parsed.error.flatten().fieldErrors);
  throw new Error('Invalid client environment variables');
}

export const env = parsed.data;