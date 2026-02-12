import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const secret = request.nextUrl.searchParams.get("secret");

    if (secret !== process.env.REVALIDATE_SECRET) {
        return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    try {
        revalidatePath("/");
        revalidatePath("/[slug]", "page");

        return NextResponse.json({ revalidated: true });
    } catch (err) {
        return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
    }
}