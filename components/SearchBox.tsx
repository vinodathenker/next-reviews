"use client";
import { useIsClient } from "@/lib/hooks";
import { Combobox } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export default function SearchBox() {
  const isClient = useIsClient();
  const [query, setQuery] = useState("");
  const [debounceQuery] = useDebounce(query, 300);
  const [reviews, setReviews] = useState([]);
  const router = useRouter();
  useEffect(() => {
    if (debounceQuery.length > 0) {
      const controller = new AbortController();
      (async () => {
        const response = await fetch(
          `/api/search?query=${encodeURIComponent(debounceQuery)}`
        );
        const reviews = await response.json();
        setReviews(reviews);
      })();
      return () => controller.abort();
    } else {
      setReviews([]);
    }
  }, [debounceQuery]);
  console.log("[SearchBox] isClient", isClient);
  if (!isClient) {
    return null;
  }
  const filtered = reviews
    .filter((review) =>
      review.title.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 5);
  const handleChange = (review) => {
    router.push(`/reviews/${review.slug}`);
  };
  return (
    <div className="relative w-48">
      <Combobox onChange={handleChange}>
        <Combobox.Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search..."
          className="border px-2 py-1 rounded w-full"
        />
        <Combobox.Options className="absolute bg-white py-1 w-full">
          {filtered.map((review) => (
            <Combobox.Option key={review.slug} value={review}>
              <span className="block px-2 truncate w-full">{review.title}</span>
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
}
