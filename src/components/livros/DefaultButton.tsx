import { forwardRef } from "react"
import { type LucideIcon } from "lucide-react"
import { Button } from "../ui/button"

type DefaultButtonProps = {
    label: string
    icon?: LucideIcon
    type?: "button" | "submit" | "reset"
}

export const DefaultButton = forwardRef<HTMLButtonElement, DefaultButtonProps>(
    ({ label, icon: Icon, type = "button" }, ref) => {
        return (
            <Button
                ref={ref}
                type={type}
                className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white px-6 py-3 sm:text-sm md:text-lg font-semibold rounded-lg shadow-md hover:shadow-xl transition-all ring-2 ring-purple-300 hover:scale-105 active:scale-95 hover:cursor-pointer"
            >
                {Icon && <Icon className="mr-2 h-4 w-4" />}
                {label}
            </Button>
        )
    }
)

DefaultButton.displayName = "DefaultButton"
