"use client";
import { AppProgressProvider } from "@bprogress/next";
import { TailwindIndicator } from "../custom/tailwind-indicator";
import { ThemeProvider } from "./theme-provider";
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AppProgressProvider
        color="var(--foreground)"
        delay={500}
        height="2px"
        options={{ showSpinner: false }}
      >
        {children}
      </AppProgressProvider>
      <TailwindIndicator />
    </ThemeProvider>
  );
}
