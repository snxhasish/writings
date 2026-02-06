import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKaTeX from "rehype-katex";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { gruvboxDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import type { Components } from "react-markdown";

interface CodeProps {
    inline?: boolean;
    className?: string;
    children?: React.ReactNode;
}

export function CodeBlock({ inline, className, children, ...props }: CodeProps) {
    const match = /language-(\w+)/.exec(className || "");

    if (!inline && match) {
        return (
            <SyntaxHighlighter
                className="rounded"
                style={gruvboxDark}
                language={match[1]}
                PreTag="div"
                showLineNumbers
            >
                {String(children).trim()}
            </SyntaxHighlighter>
        );
    }

    return <code className={className} {...props}>{children}</code>;
}

export const components: Components = {
    h1: ({ children }) => (
        <h1 className="text-4xl font-bold mt-8 mb-4">
            {children}
        </h1>
    ),
    h2: ({ children }) => (
        <h2 className="text-3xl font-bold mt-6 mb-3">
            {children}
        </h2>
    ),
    h3: ({ children }) => (
        <h3 className="text-2xl font-semibold mt-4 mb-2" >
            {children}
        </h3>
    ),

    p: ({ children }) => (
        <p className="mb-4 leading-relaxed" >
            {children}
        </p>
    ),

    a: ({ href, children }) => (
        <Link
            href={href as Url}
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
        >
            {children}
        </Link>
    ),

    ul: ({ children }) => (
        <ul className="list-disc list-inside mb-4 space-y-2" >
            {children}
        </ul>
    ),
    ol: ({ children }) => (
        <ol className="list-decimal list-inside mb-4 space-y-2" >
            {children}
        </ol>
    ),
    li: ({ children }) => (
        <li className="ml-4" > {children} </li>
    ),

    code: CodeBlock,

    blockquote: ({ children }) => (
        <blockquote className="border-l-4 rounded-l border-primary pl-4 py-2 mb-4 italic text-muted-foreground" >
            {children}
        </blockquote>
    ),

    img: ({ src, alt }) => (
        <img
            src={src}
            alt={alt}
            className="rounded-lg max-w-full h-auto my-4"
        />
    ),

    table: ({ children }) => (
        <div className="overflow-x-auto mb-4" >
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700" >
                {children}
            </table>
        </div>
    ),
    th: ({ children }) => (
        <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-left text-sm font-semibold text-gray-900 dark:text-gray-100" >
            {children}
        </th>
    ),
    td: ({ children }) => (
        <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-sm" >
            {children}
        </td>
    ),

    hr: () => (
        <hr className="my-8 border-gray-300 dark:border-gray-700" />
    ),
};

export default function Markdown({ children }: { children: string }) {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKaTeX]}
            components={components}
        >
            {children.replace(/\n{2,}/g, '\n')}
        </ReactMarkdown>
    );
}
