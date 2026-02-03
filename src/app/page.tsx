import PostPage from "@/components/post-page";
import Navbar from "@/components/navbar";
import { getAllPosts } from "@/queries/post";

export default async function Page() {
    const posts = await getAllPosts();

    return (
        <main className="h-screen flex flex-col">
            <Navbar />

            <PostPage
                posts={posts}
            />
        </main>
    )
}