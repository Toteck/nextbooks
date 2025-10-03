"use client";

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BookOpen, Plus, Moon, Sun, UserCircle2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";


import { AddBookDialog } from "./AddBookDialog";
import { useState } from "react";

export function Header() {
    const [dark, setDark] = useState(false);

    return (
        <header className="flex justify-between items-center p-4 border-b bg-purple-200">
            <div className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-purple-600" /> <span className="text-xl font-semibold">NextBooks</span>
            </div>
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    className="houver:bg-purple-500 hover:cursor-pointer"
                    onClick={() => setDark(!dark)}
                >
                    {dark ? <Sun className="h-6 w-6 text-purple-700" /> : <Moon className="h-4 w-4 text-purple-500" />}
                </Button>
            </div>


        </header>
    );
}
