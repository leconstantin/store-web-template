import { SiteFooter } from "@/components/layout/layout/site-footer";
import { SiteHeader } from "@/components/layout/layout/site-header";

export default function AppLayout(props: LayoutProps<"/">) {
  return (
    <div className="relative z-10 flex min-h-svh flex-col bg-background dark:bg-black">
      <SiteHeader />
      <main className="relative flex min-h-svh flex-1 flex-col items-center justify-center bg-muted/50 selection:bg-teal-300 dark:selection:bg-pink-500 dark:selection:text-white">
        {props.children}
      </main>
      <SiteFooter />
    </div>
  );
}
