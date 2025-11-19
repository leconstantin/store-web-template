"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { sendContactEmail } from "@/server/contact.action";
import { ContactFormSchema } from "@/server/schema";
import type { TContactSchema } from "@/server/types";

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const form = useForm<TContactSchema>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      companyEmail: "",
      content: "",
      service: "",
    },
  });

  const onSubmit = async (data: TContactSchema) => {
    setSubmitting(true);

    const createPromise = sendContactEmail(data);

    // Show a loading toast and auto-handle errors
    toast.promise(createPromise, {
      loading: "Sending email...",
    });

    try {
      const result = await createPromise;

      if (result?.success) {
        form.reset();

        toast.success("Email sent successfully", {
          description: "The email has been sent to Rathon.",
        });

        // Close the modal slightly after success
      }
    } catch {
      toast.error("Failed to send email. Please try again.", {
        description: "There was an error sending the email.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="row-span-2 h-full min-h-[500px] w-full rounded-lg bg-background p-2 md:p-6 lg:p-10">
      <Form {...form}>
        <form
          className="w-full space-y-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="companyEmail"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-5">
                <FormLabel className="font-bold">Company email </FormLabel>
                <FormControl>
                  <Input
                    autoComplete="email"
                    disabled={submitting}
                    placeholder="Email address"
                    type="email"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-5">
                <FormLabel className="font-bold">Service</FormLabel>
                <FormControl>
                  <Input
                    disabled={submitting}
                    placeholder="e.g. Web Development"
                    type="text"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-5">
                <FormLabel className="font-bold">How can we help?</FormLabel>
                <FormControl>
                  <Textarea
                    className="min-h-[300px] resize-none"
                    disabled={submitting}
                    placeholder="Tell us about your company's needs"
                    {...field}
                  />
                </FormControl>
                <div className="flex items-center justify-between">
                  <FormMessage />
                  <div className="text-muted-foreground text-xs">
                    {field.value.length}/500
                  </div>
                </div>
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              className="min-w-40 rounded-full bg-primary text-primary-foreground"
              disabled={submitting}
              size="lg"
              type="submit"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Talk to Rathon"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
