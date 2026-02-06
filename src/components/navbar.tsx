import Image from "next/image";
import { ThemeSelect } from "./theme-select";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="w-full flex items-center justify-between gap-4 px-5 sm:px-10 md:px-15 py-4">
            <Link href="/">
                <h1 className="text-xl font-semibold">
                    writings
                    <br />
                    <span className="text-xs text-muted-foreground">by snehasish</span>
                </h1>
            </Link>

            <ThemeSelect />
        </nav>
    )
}