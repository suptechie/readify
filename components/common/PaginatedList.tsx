'use client';

import React, { memo, useEffect, useState } from 'react';
import ArticleList from './ArticleList';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from '../ui/pagination';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { IExtendedArticle } from '@/types/entities';
import { fetchData } from '@/lib/fetch/fetchArticles';
import PaginationItems from './PaginationItems';
import ArticleListSkeleton from '@/components/skeleton/ArticleListSkeleton'

type Props = {
    limit: number;
    page: number;
};

const PaginatedList = ({ limit, page }: Props) => {
    const { data, isLoading, error, refetch } = useQuery<{ articles: IExtendedArticle[]; totalPages: number; }>({
        queryKey: ['home-articles', page, limit],
        queryFn: async () => await fetchData(page, limit),
        retry: 1,
        refetchInterval: 1000 * 60,
        staleTime: 1000 * 2,
    });
    const router = useRouter();
    const [userId, setUserId] = useState<string | undefined>(undefined);

    useEffect(() => {
        setUserId(localStorage.getItem('userId') || undefined);
    }, []);

    const handlePageChange = (newPage: number) => {
        router.push(`/?page=${newPage}`);
        refetch()
    };

    if (isLoading) {
        return (
            <ArticleListSkeleton isPagination={true} itemCount={limit} />
        )
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <ArticleList articles={data?.articles || []} isHome userId={userId} />

            {data?.totalPages && data.totalPages > 1 && (
                <div className="flex justify-center items-center mt-8">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => handlePageChange(page - 1)}
                                    className={page <= 1 ? 'pointer-events-none opacity-50' : ''}
                                />
                            </PaginationItem>

                            <PaginationItems totalPages={data.totalPages} currentPage={page} onPageChange={handlePageChange} />

                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => handlePageChange(page + 1)}
                                    className={page >= data.totalPages ? 'pointer-events-none opacity-50' : ''}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    );
};

export default memo(PaginatedList);