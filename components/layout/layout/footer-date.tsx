"use client";
const { COMPANY_NAME, SITE_NAME } = process.env;
export default function FooterDate() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : "");
  const copyrightName = COMPANY_NAME || SITE_NAME || "";

  return (
    <p>
      &copy; {copyrightDate} {copyrightName}
      {copyrightName.length && !copyrightName.endsWith(".") ? "." : ""} All
      rights reserved.
    </p>
  );
}
