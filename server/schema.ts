import z from "zod";

export const SubFormSchema = z.object({
  email: z
    .email({ message: "Please enter a valid email address." })
    .trim()
    .min(5, { message: "Email must be at least 5 characters." }),
});

export const ContactFormSchema = z.object({
  companyEmail: z
    .email({ message: "Please enter a valid email address." })
    .trim()
    .min(5, { message: "Email must be at least 5 characters." }),
  content: z
    .string()
    .trim()
    .min(10, { message: "Describe it in at least 10 characters." })
    .max(500, { message: "Your message is too long. Book a call instead." }),
  service: z.string().optional(),
});
