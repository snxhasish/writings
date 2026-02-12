import { client } from "@/sanity/lib/client";

export async function getAllPosts() {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      "author": author->name,
      "authorImage": author->image,
      mainImage {
        asset->,
        alt
      },
      "categories": categories[]->title,
      body
    }`,
    {},
    {
      next: {
        revalidate: 60
      }
    }
  )
}

export async function getPostBySlug(slug: string) {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      publishedAt,
      "author": author->{name, image},
      mainImage {
        asset->,
        alt
      },
      "categories": categories[]->title,
      body
    }`,
    { slug }
  )
}