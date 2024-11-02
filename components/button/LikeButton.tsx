'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Heart } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { ErrorMessage } from '@/types';

type Props = {
    id: string;
    likesCount: number;
    userIds: string[];
};

const LikeButton = ({ likesCount: initialLikesCount, userIds, id }: Props) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(initialLikesCount);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem('token') as string;
        if (userIds.includes(userId)) {
            setIsLiked(true);
        }
    }, [userIds]);

    const handleLike = async () => {
        if (isLoading) return;

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
                className={`h-5 w-5 ${
                    isLiked ? "fill-red-500 text-red-500" : "text-muted-foreground"
                } ${
                    isLoading ? "opacity-50" : ""
                }`} 
            />
            <span className={`ml-1 font-medium ${isLoading ? "opacity-50" : ""}`}>
                {likesCount}
            </span>
        </Button>
    );
};

export default LikeButton;