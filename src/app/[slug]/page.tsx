import { getPostBySlug } from "@/queries/post";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { portableTextToMarkdown } from "@portabletext/markdown";
import ReactMarkdown from "react-markdown";

export default async function PostPage({ params, }: { params: { slug: string } }) {
    const { slug } = await params;
    const post = slug ? await getPostBySlug(slug) : null;

    const markdown = portableTextToMarkdown(post.body);

    if (!post) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <h1>Not found</h1>
            </div>
        );
    }

    return (
        <article className="container mx-auto px-4 py-8 max-w-3xl">
            <h1 className="text-5xl font-bold mb-4">{post.title}</h1>

            <div className="text-gray-600 mb-6">
                {post.author?.name && <span>By {post.author.name}</span>}
                {post.publishedAt && (
                    <span className="ml-2">
                        {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        })}
                    </span>
                )}
            </div>

            {post.mainImage?.asset && (
                <Image
                    src={urlFor(post.mainImage).width(1200).url()}
                    alt={post.mainImage.alt || post.title}
                    width={1200}
                    height={600}
                    className="w-full rounded-lg mb-8"
                />
            )}

            <div className="prose max-w-none">
                <ReactMarkdown>
                    {markdown}
                </ReactMarkdown>
            </div>
        </article>
    )
}