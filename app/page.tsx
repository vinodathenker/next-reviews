import Link from "next/link";
import Heading from "@/components/Heading";
import Image from "next/image";
import { getReviews } from "@/lib/review";

export default async function HomePage() {
  const {reviews} = await getReviews(3);
  return (
    <>
      <Heading>Indie Gamer</Heading>
      <p className="pb-3">Only the bets indie game reviewed for you.</p>
      <ul className="flex gap-3">
        {reviews.map((review, index) => (
          <li key={review.slug} className="bg-white border rounded w-80 hover:shadow-xl sm:w-full">
            <Link
              href={`/reviews/${review.slug}`}
              className="flex flex-col sm:flex-row"
            >
              <Image
                priority={index === 0}
                src={review.image}
                alt={review.title}
                width={320}
                height={180}
                className="rounded-t sm:rounded-l sm:rounded-r-none"
              />
              <h2 className="font-orbitron font-semibold py-1 text-center px-2">
                {review.title}
              </h2>
              {/* <p className="hidden pt-3 sm:block">
                {review.subtitle}
              </p> */}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
