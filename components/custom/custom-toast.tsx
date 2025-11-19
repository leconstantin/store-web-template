"use client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export default function CustomToast({
  title,
  desc,
  className,
}: {
  title: string;
  desc?: string;
  className?: string;
}) {
  return (
    <Button
      onClick={() =>
        toast.custom((t) => (
          <div
            className={cn(
              "flex w-[420px] flex-col gap-5 rounded-lg border border-muted bg-background p-4 shadow-2xl",
              className
            )}
          >
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-sm">{title}</p>
              {desc && (
                <p className="font-normal text-primary/80 text-sm">{desc}</p>
              )}
            </div>
            <div className="flex items-end justify-end gap-4">
              <Button
                onClick={() => toast.dismiss(t)}
                size="sm"
                variant={"ghost"}
              >
                Dismiss
              </Button>
              <Button size="sm">Enable</Button>
            </div>
          </div>
        ))
      }
      size="sm"
      variant="outline"
    >
      Show Toast
    </Button>
  );
}
