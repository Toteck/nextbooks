import { Plus } from "lucide-react"
import { Button } from "../ui/button"

type DefaultButtonProps = {
    label: string;
}

export function DefaultButton({ label }: DefaultButtonProps) {
    return (
        <Button className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white px-6 py-3 text-lg font-semibold rounded-lg shadow-md hover:shadow-xl transition-all ring-2 ring-purple-300 hover:scale-105 active:scale-95 hover:cursor-pointer">
            <Plus className="mr-2 h-4 w-4" />
            {label}
        </Button>
    )
}