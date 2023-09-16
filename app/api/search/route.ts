import { getSearchableReviews } from "@/lib/review";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query");
  //   console.log("/api/search", query);
  const reviews = await getSearchableReviews(query);
  return NextResponse.json(reviews);
}
