import type { z } from 'zod';
import type { ContactFormSchema, SubFormSchema } from './schema';

export type TSubFormSchema = z.infer<typeof SubFormSchema>;

export type TContactSchema = z.infer<typeof ContactFormSchema>;
