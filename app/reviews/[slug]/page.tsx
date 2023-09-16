import Heading from "@/components/Heading";
import ShareButtons from "@/components/ShareButtons";
import getReview, { getSlugs } from "@/lib/review";
import Image from "next/image";
import { notFound } from "next/navigation";

// export async function generateStaticParams() {
//   const slugs = await getSlugs();
//   return slugs.map((slug) => ({
//     slug,
//   }));
// }

export async function generateMetadata({ params: { slug } }) {
  console.log("[generateMetadata]", slug);
  const review = await getReview(slug);
  if (!review) {
    notFound();
  }
  return {
    title: review.title,
  };
}

export default async function StartDewValleyPage({ params: { slug } }) {
  const review = await getReview(slug);
  console.log("[Slug]", slug);
  if (!review) {
    notFound();
  }
  return (
    <>
      <Heading>{review.title}</Heading>
      <p className="font-semibold pb-3">{review.subtitle}</p>
      <div className="flex gap-3 items-baseline">
        <p className="italic pb-2">{review.date}</p>
        <ShareButtons />
      </div>
      <Image
        priority
        src={review.image}
        alt={review.title}
        width={640}
        height={360}
        className="mb-2 rounded"
      />
      <article
        dangerouslySetInnerHTML={{ __html: review.body }}
        className="prose prose-slate max-w-screen-sm"
      />
    </>
  );
}
