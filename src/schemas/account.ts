import {z} from 'zod';

export const TRADITIONS = [
  'smarta',
  'vaishnava',
  'shaiva',
  'shakta',
  'other'
] as const;

export const CALENDARS = ['purnimanta', 'amanta'] as const;

export const LOCATIONS = [
  'New Delhi',
  'Mumbai',
  'Kolkata',
  'Chennai',
  'Bengaluru',
  'Hyderabad',
  'Ahmedabad',
  'Jaipur',
  'Lucknow',
  'Varanasi',
  'Pune',
  'Other'
] as const;

export const preferencesSchema = z.object({
  location: z.enum(LOCATIONS),
  tradition: z.enum(TRADITIONS).nullable().optional(),
  calendar: z.enum(CALENDARS)
});

export const learnBookmarkSchema = z.object({
  category: z.string().min(1).max(64),
  slug: z.string().min(1).max(128)
});

export const readingProgressSchema = z.object({
  scriptureId: z.string().uuid(),
  lastSectionId: z.string().uuid().nullable().optional(),
  lastVerseId: z.string().uuid().nullable().optional(),
  progressPercentage: z.number().min(0).max(100)
});

export type PreferencesInput = z.infer<typeof preferencesSchema>;
