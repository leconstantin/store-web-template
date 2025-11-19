"use server";

import { Resend } from "resend";
import { ThankYouForSubscribingTemplate } from "@/features/emails/to-subscriber";
import type { TSubFormSchema } from "./types";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function subscribe(formData: TSubFormSchema) {
  try {
    const { email } = formData;

    const response = await resend.contacts.create({
      email,
      audienceId: process.env.RESEND_AUDIENCE_ID,
    });
    // then send email to subscribe thanking him
    await resend.emails.send({
      from: "Constantin from Rathon <constantin@notifications.rathon-rw.com>",
      to: [email],
      subject: "Welcome to Rathon!",
      react: ThankYouForSubscribingTemplate() as React.ReactElement,
      replyTo: "rathonrw@gmail.com",
      tags: [{ name: "source", value: "website_subscribe" }],
    });

    if (response.error) {
      return { success: false, error: response.error };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}
