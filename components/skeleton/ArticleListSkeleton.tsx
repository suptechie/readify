'use client';

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { memo } from "react";

const ArticleSkeleton = memo(() => (
    <Card className="w-full overflow-hidden">
        <CardHeader className="p-0">
            <Skeleton className="h-48 w-full" />
        </CardHeader>
        <CardContent className="p-4 flex flex-col gap-3">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <div className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
            </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center p-4 border-t">
            <div className="flex items-center space-x-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
            </div>
            <Skeleton className="h-8 w-8 rounded-full" />
        </CardFooter>
    </Card>
));

const PaginationSkeleton = memo(() => (
    <div className="flex justify-center items-center mt-8">
        <div className="flex space-x-1">
            <Skeleton className="h-10 w-10 rounded-md" />
            <Skeleton className="h-10 w-10 rounded-md" />
            <Skeleton className="h-10 w-10 rounded-md" />
            <Skeleton className="h-10 w-10 rounded-md" />
            <Skeleton className="h-10 w-10 rounded-md" />
        </div>
    </div>
));

const ArticleListSkeleton = ({ itemCount = 6, isPagination }: { itemCount?: number; isPagination: boolean; }) =>{
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: itemCount }).map((_, index) => (
                    <ArticleSkeleton key={index} />
                ))}
            </div>
            {isPagination && (
                <PaginationSkeleton />
            )}
        </div>
    );
}

export default memo(ArticleListSkeleton);