'use client';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '../ui/button';
import { Heart } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { ErrorMessage } from '@/types';
import Link from 'next/link';
import { LikeButtonProps } from '@/types/props';
import { useQueryClient } from '@tanstack/react-query';

const LikeButton = ({ likesCount: initialLikesCount, userIds, id, userId }: LikeButtonProps) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(initialLikesCount);
    const [isLoading, setIsLoading] = useState(false);
    const authRef = useRef(false);
    const query = useQueryClient();

    useEffect(() => {
        authRef.current = typeof userId === 'undefined' || userId === null;

        if (userIds.includes(userId)) {
            setIsLiked(true);
        }
    }, [userIds, userId]);

    const handleLike = useCallback(async () => {
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

            query.invalidateQueries({
                queryKey: ["home-articles"],
                exact: false
            });

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
    }, [query, id, isLiked, isLoading,]);

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

export default memo(LikeButton);