import PostCard from "./post-card";

export default function PostPage({ posts }: { posts: any[] }) {
    return (
        <main className="relative w-full h-full flex flex-1 flex-col gap-4 p-5 sm:p-10 md:p-15">
            <div className="w-full flex flex-col gap-5">
                {
                    posts.map((post) => (
                        <PostCard
                            key={post._id}
                            slug={post.slug.current}
                            title={post.title}
                            publishedAt={
                                new Date(post.publishedAt).toLocaleDateString("en-US", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric"
                                })
                            }
                        />
                    ))
                }
            </div>
        </main>
    )
}