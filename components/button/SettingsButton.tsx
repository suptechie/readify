'use client';

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
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Settings, Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

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
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Settings
                    </AlertDialogTitle>
                    <div className="pt-2">
                        <h3 className="text-sm font-medium pb-2">Theme</h3>
                        <div className="flex gap-2">
                            <Button
                                variant={theme === 'light' ? 'default' : 'outline'}
                                size="icon"
                                onClick={() => handleThemeChange('light')}
                                className="w-10 h-10"
                            >
                                <Sun className="h-4 w-4" />
                                <span className="sr-only">Light Mode</span>
                            </Button>
                            <Button
                                variant={theme === 'dark' ? 'default' : 'outline'}
                                size="icon"
                                onClick={() => handleThemeChange('dark')}
                                className="w-10 h-10"
                            >
                                <Moon className="h-4 w-4" />
                                <span className="sr-only">Dark Mode</span>
                            </Button>
                            <Button
                                variant={theme === 'system' ? 'default' : 'outline'}
                                size="icon"
                                onClick={() => handleThemeChange('system')}
                                className="w-10 h-10"
                            >
                                <Monitor className="h-4 w-4" />
                                <span className="sr-only">System Theme</span>
                            </Button>
                        </div>
                    </div>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Close</AlertDialogCancel>
                </AlertDialogFooter>
                <AlertDialogDescription />
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default SettingsButton;