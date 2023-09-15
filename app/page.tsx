import Link from "next/link";
import Heading from "@/components/Heading";
import { getFeaturedReview } from "@/lib/review";


export default async function HomePage() {
  const review = await getFeaturedReview();
  return (
    <>
      <Heading>Indie Gamer</Heading>
      <p className="pb-3">Only the bets indie game reviewed for you.</p>
      <div className="bg-white border rounded w-80 hover:shadow-xl sm:w-full">
        <Link
          href={`/reviews/${review.slug}`}
          className="flex flex-col sm:flex-grow"
        >
          <img
            src={review.image}
            width={320}
            height={180}
            className="rounded-t sm:rounded-l sm:rounded-r-none"
          />
          <h2 className="font-orbitron font-semibold py-1 text-center px-2">
            {review.title}
          </h2>
        </Link>
      </div>
    </>
  );
}
