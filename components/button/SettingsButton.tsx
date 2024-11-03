'use client';

import { useState } from "react";
import { useTheme } from "next-themes";
import { Settings, Sun, Moon, Monitor } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import PreferenceInput from "../forms/PreferenceInput";

const SettingsButton = () => {
    const [isOpen, setOpen] = useState(false);
    const { theme, setTheme } = useTheme();

    const handleThemeChange = (value: string) => {
        setTheme(value);
        toast({
            title: "Theme updated",
            description: `Theme changed to ${value} mode`,
        });
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <DropdownMenuItem
                    onSelect={(event) => {
                        event.preventDefault();
                        setOpen(true);
                    }}
                    className="cursor-pointer"
                >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-full max-w-lg">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-2xl font-bold">
                        Settings
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Customize your experience
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="py-4">
                    <h3 className="text-lg font-semibold mb-4">Theme</h3>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                        {['light', 'dark', 'system'].map((t) => (
                            <Button
                                key={t}
                                variant={theme === t ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => handleThemeChange(t)}
                                className="flex-1 py-2 sm:py-4"
                            >
                                {t === 'light' && <Sun className="h-4 w-4 mr-2" />}
                                {t === 'dark' && <Moon className="h-4 w-4 mr-2" />}
                                {t === 'system' && <Monitor className="h-4 w-4 mr-2" />}
                                <span className="capitalize">{t}</span>
                            </Button>
                        ))}
                    </div>
                </div>
                <Separator />
                <PreferenceInput />
                <AlertDialogFooter>
                    <AlertDialogCancel asChild>
                        <Button variant="outline" size="sm">Close</Button>
                    </AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default SettingsButton;