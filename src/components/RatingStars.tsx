import { Star } from "lucide-react";

type RatingStarsProps = {
    value: number;
    onChange: (newValue: number) => void
}

// estrelas de avaliação
export function RatingStars({ value, onChange }: RatingStarsProps) {
    return (
        <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => {
                const starValue = i + 1;
                return (
                    <Star
                        key={i}
                        onClick={() => onChange(starValue)}
                        className={`h-6 w-6 transition-colors ${starValue <= value ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                            }`}
                    />
                )
            })}
        </div>
    )
};