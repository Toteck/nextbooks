import { forwardRef } from "react";
import { type LucideIcon } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils"; // garante que classes possam ser mescladas corretamente
import { WithTooltip } from "./Tooltip";

type DefaultButtonProps = {
    label?: string;
    icon?: LucideIcon;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" | "outline" | "ghost" | "text";
    onClick?: () => void;
    className?: string;
    responsive?: boolean;
};

// 🎨 Paleta de cores base
// Roxo principal: purple-600 (#9333ea)
// Roxo hover: purple-700
// Branco: #fff
// Bordas e sombras suaves

export const DefaultButton = forwardRef<HTMLButtonElement, DefaultButtonProps>(
    (
        { label, icon: Icon, type = "button", onClick, variant = "primary", className, responsive = false },
        ref
    ) => {
        const baseStyle =
            "inline-flex items-center justify-center gap-2 font-semibold rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 active:scale-95 cursor-pointer";

        const variants = {
            primary:
                "bg-purple-600 text-white hover:bg-purple-700 shadow-md hover:shadow-lg dark:bg-purple-100 dark:text-purple-800",
            secondary:
                "bg-white text-purple-700 border border-purple-300 hover:bg-purple-50 hover:border-purple-400",
            outline:
                "bg-transparent border border-purple-600 text-purple-700 hover:bg-purple-100",
            ghost:
                "bg-transparent text-purple-600 hover:bg-purple-100",
            text:
                "bg-transparent text-purple-600 underline-offset-4 hover:underline",
        };

        return (
            <WithTooltip label="Adicionar Novo Livro" side="left">
                <Button
                    ref={ref}
                    type={type}
                    onClick={onClick}
                    className={cn(baseStyle, variants[variant], className)}
                >
                    {Icon && <Icon className="h-4 w-4" />}
                    {responsive ? (<span className="hidden sm:inline">{label}</span>) : (label)}

                </Button>
            </WithTooltip>
        );
    }
);

DefaultButton.displayName = "DefaultButton";
