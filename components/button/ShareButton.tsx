'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
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

interface ShareOption {
    name: string;
    icon: React.ReactNode;
    color: string;
    shareUrl: (url: string) => string;
}

const shareOptions: ShareOption[] = [
    {
        name: 'Facebook',
        icon: <Image src="/assets/social/facebook.svg" alt="Facebook" width={24} height={24} />,
        color: 'bg-[#1877F2] hover:bg-[#166FE5]',
        shareUrl: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
        name: 'Twitter',
        icon: <Image src="/assets/social/twitter.svg" alt="Twitter" width={24} height={24} />,
        color: 'bg-[#1DA1F2] hover:bg-[#1A91DA]',
        shareUrl: (url) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
    },
    {
        name: 'LinkedIn',
        icon: <Image src="/assets/social/linkedin.svg" alt="LinkedIn" width={24} height={24} />,
        color: 'bg-[#0A66C2] hover:bg-[#004182]',
        shareUrl: (url) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
        name: 'Instagram',
        icon: <Image src="/assets/social/instagram.svg" alt="Instagram" width={24} height={24} />,
        color: 'bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737]',
        shareUrl: (url) => url,
    },
    {
        name: 'WhatsApp',
        icon: <Image src="/assets/social/whatsapp.svg" alt="WhatsApp" width={24} height={24} />,
        color: 'bg-[#25D366] hover:bg-[#20BD5C]',
        shareUrl: (url) => `https://wa.me/?text=${encodeURIComponent(url)}`,
    },
    {
        name: 'GitHub',
        icon: <Image src="/assets/social/github.svg" alt="GitHub" width={24} height={24} />,
        color: 'bg-[#333333] hover:bg-[#24292F]',
        shareUrl: (url) => url,
    },
];

const ShareButton = ({ id }: { id: string; }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const articleUrl = `${NEXT_PUBLIC_API_URL}/articles/${id}`;

    const handleShare = (option: ShareOption) => {
        if (option.name === 'GitHub' || option.name === 'Instagram') {
            navigator.clipboard.writeText(articleUrl);
            toast({
                title: "Link copied!",
                description: `You can now paste the link on ${option.name}.`,
            });
        } else {
            window.open(option.shareUrl(articleUrl), '_blank');
        }
        setIsOpen(false);
    };

    const MappedIcons = useMemo(() => shareOptions.map((option) => (
        <Button
            key={option.name}
            variant="ghost"
            className={cn(
                "flex items-center justify-center gap-2 h-14 w-full transition-all",
                option.color,
                option.name === 'Instagram' ? 'hover:opacity-90' : ''
            )}
            onClick={() => handleShare(option)}
        >
            {option.icon}
            <span className="font-medium">{option.name}</span>
        </Button>
    )), [handleShare]);

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
            <DialogContent className="sm:max-w-md bg-zinc-900 border-zinc-800">
                <DialogHeader>
                    <DialogTitle className="text-white">Share article</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4 py-4">
                        {MappedIcons}
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-zinc-700" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-zinc-900 px-2 text-zinc-500">Or</span>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        className="mt-2 w-full text-sm font-medium bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700 hover:text-white"
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