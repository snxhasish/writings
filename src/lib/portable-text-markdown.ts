import { toPlainText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";

export function portableTextToMarkdownWithImages(blocks: any[]): string {
    if (!blocks) return "";

    return blocks
        .map((block) => {
            if (block._type === "image") {
                const imageUrl = urlFor(block).url();
                const alt = block.alt || "Image";
                return `![${alt}](${imageUrl})\n`;
            }
            if (block._type === "code") {
                const language = block.language || "";
                return `\`\`\`${language}\n${block.code}\n\`\`\`\n`;
            }
            if (block._type === "block") {
                const text = block.children
                    ?.map((child: any) => {
                        let content = child.text || "";

                        if (child.marks) {
                            child.marks.forEach((mark: string) => {
                                if (mark === "strong") content = `**${content}**`;
                                if (mark === "em") content = `*${content}*`;
                                if (mark === "code") content = `\`${content}\``;
                            });
                        }

                        if (block.markDefs && block.markDefs.length > 0) {
                            block.markDefs.forEach((markDef: any) => {
                                if (markDef._type === "link" && child.marks?.includes(markDef._key)) {
                                    content = `[${content}](${markDef.href})`;
                                }
                            });
                        }

                        return content;
                    })
                    .join("");

                switch (block.style) {
                    case "h1":
                        return `# ${text}\n`;
                    case "h2":
                        return `## ${text}\n`;
                    case "h3":
                        return `### ${text}\n`;
                    case "h4":
                        return `#### ${text}\n`;
                    case "blockquote":
                        return `> ${text}\n`;
                    default:
                        return text ? `${text}\n` : "";
                }
            }

            // Handle lists
            if (block._type === "block" && block.listItem) {
                const text = toPlainText(block);
                const prefix = block.listItem === "bullet" ? "- " : "1. ";
                return `${prefix}${text}\n`;
            }

            return "";
        })
        .join("\n");
}