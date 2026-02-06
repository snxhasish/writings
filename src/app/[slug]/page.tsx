import { getPostBySlug } from "@/queries/post";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { portableTextToMarkdown } from "@portabletext/markdown";
import Markdown from "@/components/markdown";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

export default async function PostPage({ params, }: { params: { slug: string } }) {
    const { slug } = await params;
    const post = slug ? await getPostBySlug(slug) : null;

    const markdown = portableTextToMarkdown(post.body);

    console.log(markdown)

    if (!post) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <h1>Not found</h1>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full">
            <Navbar />

            <article className="container mx-auto px-4 py-8 max-w-3xl">
                <h1 className="text-5xl font-bold mb-4">{post.title}</h1>

                <div className="text-muted-foreground font-medium mb-6">
                    {/* {post.author?.name && <span>By {post.author.name}</span>} */}
                    {post.publishedAt && (
                        <span className="">
                            {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "long",
                                year: "numeric"
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
                    <Markdown>
                        {markdown}
                    </Markdown>
                </div>
            </article>
        </div>
    )
}