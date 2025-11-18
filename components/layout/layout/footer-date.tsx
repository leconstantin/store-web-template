"use client";

import { siteConfig } from "@/config/site";

export default function FooterDate() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : "");

  return (
    <p>
      &copy; {copyrightDate} {siteConfig.name} All rights reserved.d
    </p>
  );
}
