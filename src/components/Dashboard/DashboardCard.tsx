import { type LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type DashboardCardProps = {
    title: string;
    icon?: LucideIcon;
    value: number | string;
}

export function DashboardCard({ title, icon: Icon, value }: DashboardCardProps) {
    return (

        <Card className="min-w-[200px] flex-shrink-0 text-center md:min-w-[45px] dark:bg-purple-200 dark:text-purple-900">
            <CardHeader className="flex flex-row items-center justify-between text-sm font-medium">
                <CardTitle className="text-sm">{title}</CardTitle>
                {Icon && <Icon className="h-4 w-4 text-muted-foreground text-purple-400 dark:text-purple-600" />}
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center pt-2">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-500">{value ?? "-"}</div>
            </CardContent>
            {/* <CardFooter className="flex flex-col items-center">
                <p className="text-xs text-muted-foreground">
                    +1 no último mês
                </p>
            </CardFooter> */}
        </Card>
    )
}