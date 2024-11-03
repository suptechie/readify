'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Link2 } from 'lucide-react';
import { NEXT_PUBLIC_API_URL } from '@/config';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { ShareOption } from '@/types';
import { shareOptions } from '@/constants';

const ShareButton = ({ id }: { id: string; }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const articleUrl = `${NEXT_PUBLIC_API_URL}/articles/${id}`;

    const handleShare = (option: ShareOption) => {
        if (option.name === 'GitHub') {
            navigator.clipboard.writeText(articleUrl);
            toast({
                title: "Link copied!",
                description: "You can now paste the link on GitHub.",
            });
        } else if (option.name === 'Instagram') {
            navigator.clipboard.writeText(articleUrl);
            toast({
                title: "Link copied!",
                description: "You can now paste the link on Instagram.",
            });
        } else {
            window.open(option.shareUrl(articleUrl), '_blank');
        }
        setIsOpen(false);
    };


    const handleCopyLink = () => {
        navigator.clipboard.writeText(articleUrl);
        toast({
            title: "Link copied!",
            description: "The article link has been copied to your clipboard.",
        });
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-primary/10"
                    aria-label="Share article"
                >
                    <Share2 className="h-5 w-5 text-muted-foreground" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Share article</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4 py-4">
                        {shareOptions.map((option) => (
                            <Button
                                key={option.name}
                                variant="ghost"
                                className={cn(
                                    "flex items-center justify-center gap-2 h-16 w-full transition-all",
                                    option.color,
                                    option.hoverColor
                                  )}
                                onClick={() => handleShare(option)}
                            >
                                {option.icon}
                                <span className="font-medium">{option.name}</span>
                            </Button>
                        ))}
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">Or</span>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        className="mt-2 w-full text-sm font-medium"
                        onClick={handleCopyLink}
                    >
                        <Link2 className="mr-2 h-4 w-4" />
                        Copy article link
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ShareButton;