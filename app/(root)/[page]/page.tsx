import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Prose from "@/features/web/product/prose";
import { getPage, getPages } from "@/shopify";

export async function generateMetadata(
  props: PageProps<"/[page]">
): Promise<Metadata> {
  const params = await props.params;
  const page = await getPage(params.page);

  if (!page) return notFound();

  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description || page.bodySummary,
    openGraph: {
      publishedTime: page.createdAt,
      modifiedTime: page.updatedAt,
      type: "article",
    },
  };
}
export async function generateStaticParams() {
  const pages = await getPages();

  return pages.map((p) => ({
    page: p.handle,
  }));
}
export default async function Page(props: PageProps<"/[page]">) {
  const params = await props.params;
  const page = await getPage(params.page);

  if (!page) return notFound();

  return (
    <>
      <h1 className="mb-8 font-bold text-5xl">{page.title}</h1>
      <Prose className="mb-8" html={page.body} />
      <p className="text-sm italic">
        {`This document was last updated on ${new Intl.DateTimeFormat(
          undefined,
          {
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        ).format(new Date(page.updatedAt))}.`}
      </p>
    </>
  );
}
