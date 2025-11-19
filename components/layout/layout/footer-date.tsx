"use client";

import { siteConfig } from "@/config/site";

export default function FooterDate() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2024 + (currentYear > 2024 ? `-${currentYear}` : "");

  return (
    <p>
      &copy; {copyrightDate} {siteConfig.name} All rights reserved
    </p>
  );
}
