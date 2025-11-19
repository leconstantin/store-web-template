"use server";

import { Resend } from "resend";
import { EmailTemplate } from "@/features/emails/email-template";
import { ContactFormSchema } from "./schema";
import type { TContactSchema } from "./types";

// Initialize Resend with API key from environment variables
const resendClient = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(data: TContactSchema) {
  try {
    // parse using safeParse it first
    const result = ContactFormSchema.safeParse(data);

    if (!result.success) {
      return { success: false, error: result.error };
    }

    const { companyEmail, content, service } = result.data;

    const response = await resendClient.emails.send({
      from: "Rathon Contact Form <contact@notifications.rathon-rw.com>",
      to: ["rathonrw@gmail.com"],
      subject: `${content.slice(0, 20)}...`,
      react: EmailTemplate({
        companyEmail,
        content,
        service,
      }) as React.ReactElement,
      replyTo: companyEmail,
      tags: [{ name: "source", value: "website_contact" }],
    });

    if (response.error) {
      return { success: false, error: response.error };
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: err };
  }
}
