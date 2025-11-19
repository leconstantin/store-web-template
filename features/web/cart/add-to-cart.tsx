"use client";

import clsx from "clsx";
import { MinusIcon, PlusIcon } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import type { Product, ProductVariant } from "@/shopify/types";

function SubmitButton({
  availableForSale,
  selectedVariantId,
  onClick,
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
  onClick: () => void;
}) {
  const buttonClasses =
    "relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white";
  const disabledClasses = "cursor-not-allowed opacity-60 hover:opacity-60";

  if (!availableForSale) {
    return (
      <button
        className={clsx(buttonClasses, disabledClasses)}
        disabled
        type="button"
      >
        Out Of Stock
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Please select an option"
        className={clsx(buttonClasses, disabledClasses)}
        disabled
        type="button"
      >
        <div className="absolute left-0 ml-4">
          <PlusIcon className="h-5" />
        </div>
        Select options
      </button>
    );
  }

  return (
    <button
      aria-label="Add to cart"
      className={clsx(buttonClasses, {
        "hover:opacity-90": true,
        "cursor-pointer": true,
      })}
      onClick={onClick}
      type="button"
    >
      <div className="absolute left-0 ml-4">
        <PlusIcon className="h-5" />
      </div>
      Buy Now
    </button>
  );
}

export function AddToCart({ product }: { product: Product }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { variants, availableForSale } = product;
  const [quantity, setQuantity] = useState(1);
  const WHATSAPP_NUMBER = "250794674036";

  // Build state object from searchParams for option lookup
  const state = product.options.reduce<{ [key: string]: string }>(
    (acc, option) => {
      const value = searchParams.get(option.name.toLowerCase());
      if (value) acc[option.name.toLowerCase()] = value;
      return acc;
    },
    {}
  );

  const variant = variants.find((v: ProductVariant) =>
    v.selectedOptions.every(
      (option) => option.value === state[option.name.toLowerCase()]
    )
  );

  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const finalVariant = variants.find((v) => v.id === selectedVariantId);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    if (!finalVariant) {
      toast.error("Please select a variant");
      return;
    }

    try {
      // Get current product URL
      const productUrl = `${siteConfig.url}${pathname}`;

      // Build WhatsApp message
      const productName = product.title;
      const variantInfo =
        finalVariant.title !== "Default Title"
          ? `\nVariant: ${finalVariant.title}`
          : "";
      const pricePerUnit = finalVariant.price.amount
        ? Number.parseFloat(finalVariant.price.amount)
        : 0;
      const totalPrice = pricePerUnit * quantity;
      const priceInfo = finalVariant.price.amount
        ? `\nPrice: ${
            finalVariant.price.currencyCode
          } ${pricePerUnit} x ${quantity} = ${
            finalVariant.price.currencyCode
          } ${totalPrice.toFixed(2)}`
        : "";

      const message = `Hi! I'm interested in ordering:\n\nProduct Link: ${productUrl}\n\n*${productName}*${variantInfo}\nQuantity: ${quantity}${priceInfo}\n\nCan you help me complete this order?`;

      // Encode message for URL
      const encodedMessage = encodeURIComponent(message);

      // Create WhatsApp URL
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

      // Open WhatsApp in new tab
      window.open(whatsappUrl, "_blank");

      toast.custom((t) => (
        <div
          className={cn(
            "mt-auto flex w-[420px] flex-col gap-5 rounded-lg border border-muted bg-background p-4 shadow-2xl"
          )}
        >
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-sm">Redirected you to WhatsApp</p>
            <p className="font-normal text-primary/80 text-sm">
              We are redirecting you to WhatsApp to complete your order.
            </p>
          </div>
          <div className="flex items-end justify-end gap-4">
            <Button
              onClick={() => toast.dismiss(t)}
              size="sm"
              variant={"ghost"}
            >
              Dismiss
            </Button>
            <Button size="sm">Contact Us</Button>
          </div>
        </div>
      ));
    } catch (error: unknown) {
      toast.error((error as Error)?.message || "Failed to open WhatsApp");
    }
  };

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center gap-3">
        <span className="font-medium text-sm">Quantity:</span>
        <div className="flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
          <button
            aria-label="Decrease quantity"
            className={clsx(
              "ease flex h-full min-w-9 max-w-9 flex-none cursor-pointer items-center justify-center rounded-full p-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80"
            )}
            onClick={handleDecrement}
            type="button"
          >
            <MinusIcon className="size-4 dark:text-neutral-500" />
          </button>

          <p className="w-6 text-center">
            <span className="w-full text-sm">{quantity}</span>
          </p>

          <button
            aria-label="Increase quantity"
            className={clsx(
              "ease flex h-full min-w-9 max-w-9 flex-none cursor-pointer items-center justify-center rounded-full p-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80"
            )}
            onClick={handleIncrement}
            type="button"
          >
            <PlusIcon className="size-4 dark:text-neutral-500" />
          </button>
        </div>
      </div>
      <SubmitButton
        availableForSale={availableForSale}
        onClick={handleAddToCart}
        selectedVariantId={selectedVariantId}
      />
    </div>
  );
}
