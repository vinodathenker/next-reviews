import "server-only";
import { marked } from "marked";
import qs from "qs";

const CMS_URL = process.env.CMS_URL;
export const CACHE_TAG_REVIEWS = "reviews";

export default async function getReview(slug) {
  const { data } = await fetchReviews({
    filters: { slug: { $eq: slug } },
    fields: ["slug", "title", "subtitle", "publishedAt", "body"],
    populate: { image: { fileds: ["url"] } },
    pagination: { pageSize: 1, withCount: false },
  });
  if (!data || data.length < 1) {
    return null;
  }
  const item = data[0];
  return {
    ...toReview(item),
    body: marked(item.attributes.body),
  };
}

export async function getReviews(pageSize, page = 1) {
  const { data, meta } = await fetchReviews({
    fields: ["slug", "title", "subtitle", "publishedAt"],
    populate: { image: { fileds: ["url"] } },
    sort: ["publishedAt:desc"],
    pagination: { pageSize, page },
  });

  return { reviews: data.map(toReview), pageCount: meta.pagination.pageCount };
}
export async function getSlugs() {
  const { data } = await fetchReviews({
    fields: ["slug"],
    sort: ["publishedAt:desc"],
    pagination: { pageSize: 100 },
  });
  return data.map((item) => item.attributes.slug);
}
export async function getSearchableReviews(query) {
  const { data } = await fetchReviews({
    filters: { title: { $containsi: query } },
    fields: ["slug", "title"],
    sort: ["title"],
    pagination: { pageSize: 5 },
  });
  return data.map(({ attributes }) => ({
    slug: attributes.slug,
    title: attributes.title,
  }));
}

async function fetchReviews(parameters) {
  const url =
    `${CMS_URL}/api/reviews?` +
    qs.stringify(parameters, { encodeValuesOnly: true });

  const response = await fetch(url, {
    next: {
      tags: [CACHE_TAG_REVIEWS],
    },
  });
  if (!response.ok) {
    throw new Error(`CMS returned ${response.status} for ${url}`);
  }
  return await response.json();
}

function toReview(item) {
  const { attributes } = item;
  return {
    slug: attributes.slug,
    title: attributes.title,
    subtitle: attributes.subtitle,
    date: attributes.publishedAt.slice(0, "yyy-mm-dd".length),
    image: new URL(attributes.image.data.attributes.url, CMS_URL).href,
  };
}
