"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export function WelcomeToast() {
  useEffect(() => {
    // ignore if screen height is too small
    if (window.innerHeight < 650) return;
    if (!document.cookie.includes("welcome-toast=2")) {
      toast("🛍️ Welcome to Next.js Commerce!", {
        id: "welcome-toast",
        duration: Number.POSITIVE_INFINITY,
        onDismiss: () => {
          document.cookie = "welcome-toast=2; max-age=31536000; path=/";
        },
        description: (
          <>
            This is a high-performance, SSR storefront powered by Shopify,
            Next.js, and Vercel.{" "}
            <a
              className="text-blue-600 hover:underline"
              href="https://vercel.com/templates/next.js/nextjs-commerce"
              rel="noopener"
              target="_blank"
            >
              Deploy your own
            </a>
            .
          </>
        ),
      });
    }
  }, []);

  return null;
}
