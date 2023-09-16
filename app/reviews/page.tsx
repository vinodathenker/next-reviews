import Heading from "@/components/Heading";
import PaginationBar from "@/components/PaginationBar";
import SearchBox from "@/components/SearchBox";
import { getReviews, getSearchableReviews } from "@/lib/review";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Reviews",
};
const PAGE_SIZE = 6;
export default async function ReviewsPage({ searchParams }) {
  const page = parsePageParam(searchParams);
  const { reviews, pageCount } = await getReviews(PAGE_SIZE, page);
  return (
    <>
      <Heading>Reviews</Heading>
      <div className="flex justify-between pb-3">
        <PaginationBar href={"/reviews"} page={page} pageCount={pageCount} />
        <SearchBox />
      </div>
      <ul className="flex flex-row flex-wrap gap-3">
        {reviews.map((review, index) => {
          return (
            <li
              key={review.slug}
              className="bg-white border rounded w-80 hover:shadow-2xl"
            >
              <Link href={`/reviews/${review.slug}`}>
                <Image
                  priority={index === 0}
                  src={review.image}
                  alt={review.title}
                  width={320}
                  height={180}
                  className="rounded-t"
                />
                <h2 className="font-orbitron font-semibold py-1 text-center">
                  {review.title}
                </h2>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

function parsePageParam(paramValue) {
  if (paramValue) {
    const page = parseInt(paramValue.page);
    if (isFinite(page) && page > 0) return page;
  }
  return 1;
}
