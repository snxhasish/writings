"use client";

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ContrastIcon } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeSelect() {
    const { theme, setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <ContrastIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Dark</DropdownMenuLabel>
                    <ThemeSelectItem
                        theme={theme}
                        value={"dark"}
                        setTheme={setTheme}
                    >
                        Default
                    </ThemeSelectItem>
                    <ThemeSelectItem
                        theme={theme}
                        value={"haze"}
                        setTheme={setTheme}
                    >
                        Haze
                    </ThemeSelectItem>
                    <ThemeSelectItem
                        theme={theme}
                        value={"catppuccin"}
                        setTheme={setTheme}
                    >
                        Catppuccin
                    </ThemeSelectItem>
                    <ThemeSelectItem
                        theme={theme}
                        value={"mocha"}
                        setTheme={setTheme}
                    >
                        Mocha
                    </ThemeSelectItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Light</DropdownMenuLabel>
                    <ThemeSelectItem
                        theme={theme}
                        value={"light"}
                        setTheme={setTheme}
                    >
                        Default
                    </ThemeSelectItem>
                    <ThemeSelectItem
                        theme={theme}
                        value={"vintage"}
                        setTheme={setTheme}
                    >
                        Vintage
                    </ThemeSelectItem>
                    <ThemeSelectItem
                        theme={theme}
                        value={"t3"}
                        setTheme={setTheme}
                    >
                        T3
                    </ThemeSelectItem>
                    <ThemeSelectItem
                        theme={theme}
                        value={"graphite"}
                        setTheme={setTheme}
                    >
                        Graphite
                    </ThemeSelectItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export function ThemeSelectItem({ children, theme, value, setTheme }: { children: React.ReactNode, theme?: string, value: string, setTheme: (theme: string) => void }) {
    const checked = theme === value;

    return (
        <DropdownMenuCheckboxItem
            checked={checked}
            onCheckedChange={() => {
                if (!checked) setTheme(value);
            }}
        >
            {children}
        </DropdownMenuCheckboxItem>
    )
}