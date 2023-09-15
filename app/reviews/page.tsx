import Heading from "@/components/Heading";
import { getReviews } from "@/lib/review";
import Link from "next/link";

export const metadata = {
  title: "Reviews",
};
export default async function ReviewsPage() {
  const reviews = await getReviews();
  return (
    <>
      <Heading>Reviews</Heading>
      <ul className="flex flex-row flex-wrap gap-3">
        {reviews.map((review) => {
          return (
            <li
              key={review.slug}
              className="bg-white border rounded w-80 hover:shadow-2xl"
            >
              <Link href={`/reviews/${review.slug}`}>
                <img
                  src={review.image}
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
