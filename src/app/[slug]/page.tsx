import { getPostBySlug } from "@/queries/post";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { portableTextToMarkdown } from "@portabletext/markdown";
import Markdown from "@/components/markdown";
import Navbar from "@/components/navbar";
import { Metadata } from "next";

type Props = {
    params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = slug ? await getPostBySlug(slug) : null;

    if (!post) {
        return {
            title: "Post Not Found",
            description: "The requested blog post could not be found.",
        };
    }

    const ogImage = post.mainImage?.asset
        ? urlFor(post.mainImage).width(1200).height(630).url()
        : undefined;

    const markdown = portableTextToMarkdown(post.body);
    const plainText = markdown
        .replace(/[#*`\[\]]/g, "")
        .replace(/\n+/g, " ")
        .trim();
    const description = plainText.length > 160
        ? plainText.substring(0, 157) + "..."
        : plainText;

    const publishedTime = post.publishedAt
        ? new Date(post.publishedAt).toISOString()
        : undefined;

    return {
        title: post.title,
        description: description || post.title,

        authors: post.author?.name
            ? [{ name: post.author.name }]
            : undefined,

        openGraph: {
            type: "article",
            title: post.title,
            description: description || post.title,
            url: `https://writings.snehasish.xyz/${slug}`,
            siteName: "writings by snehasish",
            images: ogImage ? [
                {
                    url: ogImage,
                    width: 1200,
                    height: 600,
                    alt: post.mainImage?.alt || post.title,
                },
                {
                    url: "https://snehasish.xyz/banner.png",
                    width: 1200,
                    height: 600,
                    alt: "Banner",
                },
            ] : undefined,
            publishedTime,
            modifiedTime: post._updatedAt
                ? new Date(post._updatedAt).toISOString()
                : undefined,
            authors: post.author?.name ? [post.author.name] : undefined,
        },

        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: description || post.title,
            images: ogImage ? [ogImage] : undefined,
            creator: "@snehasishxyz",
        },

        alternates: {
            canonical: `https://writings.snehasish.xyz/${slug}`,
        },

        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
    };
}

export default async function PostPage({ params, }: Props) {
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