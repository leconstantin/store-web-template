import type { NextRequest, NextResponse } from "next/server";
import { revalidate } from "@/shopify";

export function POST(req: NextRequest): Promise<NextResponse> {
  return revalidate(req);
}
