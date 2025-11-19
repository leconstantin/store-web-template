import type { Route } from "next";
import Link from "next/link";
import { Suspense } from "react";
import LogoSquare from "@/components/icons/logo-square";
import { Button } from "@/components/ui/button";
import { getMenu } from "@/shopify/index";
import type { Menu } from "@/shopify/types";
import MobileMenu from "./mobile-menu";
import Search, { SearchSkeleton } from "./search";

const { SITE_NAME } = process.env;

export async function SiteHeader() {
  const menu = await getMenu("frontend-header-menu");

  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="block flex-none md:hidden">
        <Suspense fallback={null}>
          <MobileMenu menu={menu} />
        </Suspense>
      </div>
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3">
          <Link
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
            href="/"
            prefetch={true}
          >
            <LogoSquare />
            <div className="ml-2 flex-none font-medium text-sm uppercase md:hidden lg:block">
              {SITE_NAME}
            </div>
          </Link>
          {menu.length ? (
            <ul className="hidden gap-6 text-sm md:flex md:items-center">
              {menu.map((item: Menu) => (
                <li key={item.title}>
                  <Link
                    className="text-muted-foreground text-sm underline-offset-4 hover:text-primary hover:underline"
                    href={item.path as Route}
                    prefetch={true}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="hidden justify-center md:flex md:w-1/3">
          <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense>
        </div>
        <div className="flex items-center justify-end gap-4 md:w-1/3">
          <Button className="text-sm" size="sm">
            <Link href="/contact" prefetch={true}>
              Contact Us
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
