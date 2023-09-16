import { revalidateTag } from "next/cache";
import { CACHE_TAG_REVIEWS } from "@/lib/review";

export async function POST(request) {
  const payload = await request.json();
  console.log("[payload]", payload);
  if (payload && payload.model) {
    revalidateTag(CACHE_TAG_REVIEWS);
  }
  return new Response(null, { status: 204 });
}
