'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../ui/button';
import { Heart } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { ErrorMessage } from '@/types';
import Link from 'next/link';

type Props = {
    id: string;
    likesCount: number;
    userIds: string[];
};

const LikeButton = ({ likesCount: initialLikesCount, userIds, id }: Props) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(initialLikesCount);
    const [isLoading, setIsLoading] = useState(false);
    const authRef = useRef(false)

    useEffect(() => {
        const userId = localStorage.getItem('token') as string;
        authRef.current =  typeof userId === 'undefined' || userId === null;
        console.log(userId);

        if (userIds.includes(userId)) {
            setIsLiked(true);
        }
    }, [userIds]);

    const handleLike = async () => {
        if (isLoading) return;

        if (authRef.current) {
            return toast({
                title: "Authentication Required",
                variant: "warning",
                description: "You should login to perform actions",
                action: (
                    <Link href={'/login'}>
                        <Button variant={'outline'}>
                            Login
                        </Button>
                    </Link>
                )
            });
        }

        try {
            setIsLoading(true);
            setIsLiked(prevIsLiked => !prevIsLiked);
            setLikesCount(prev => isLiked ? prev - 1 : prev + 1);

            const response = await fetch('/api/article', {
                method: "PATCH",
                body: JSON.stringify({ id })
            });

            if (!response.ok) {
                setIsLiked(prevIsLiked => !prevIsLiked);
                setLikesCount(prev => isLiked ? prev + 1 : prev - 1);

                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update like');
            }
            //eslint-disable-next-line
        } catch (error: any) {
            toast({
                title: "Error updating like",
                description: error.message || ErrorMessage.ERROR_DEFAULT,
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            disabled={isLoading}
            aria-label={isLiked ? "Unlike" : "Like"}
            className="hover:bg-primary/10 relative"
        >
            <Heart
                className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : "text-muted-foreground"
                    } ${isLoading ? "opacity-50" : ""
                    }`}
            />
            <span className={`ml-1 font-medium ${isLoading ? "opacity-50" : ""}`}>
                {likesCount}
            </span>
        </Button>
    );
};

export default LikeButton;