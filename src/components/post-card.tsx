import Link from "next/link";

export default function PostCard({ title, slug, publishedAt }: { title: string, slug: string, publishedAt: string }) {
    return (
        <div className="w-full flex flex-col gap-4">
            <span className="text-muted-foreground">
                {publishedAt}
            </span>

            <Link href={`/${slug}`}>
                <article className="w-full">
                    <h1 className="text-lg w-full font-semibold hover:underline line-clamp-2">
                        {title}
                    </h1>
                </article>
            </Link>
        </div>
    )
}