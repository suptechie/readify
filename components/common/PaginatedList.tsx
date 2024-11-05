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
import { useQuery } from '@tanstack/react-query';
import { IExtendedArticle } from '@/types/entities';
import { fetchData } from '@/lib/fetch/fetchArticles';
import PaginationItems from './PaginationItems';
import ArticleListSkeleton from '@/components/skeleton/ArticleListSkeleton';
import { parseAsInteger, useQueryStates, parseAsString } from 'nuqs';

const PaginatedList = () => {
    const limit = 6;
    const [userId, setUserId] = useState<string | undefined>(undefined);

    const [{ page, search }, setParams] = useQueryStates({
        page: parseAsInteger.withDefault(1),
        search: parseAsString.withDefault("")
    }, {
        urlKeys: {
            page: "page",
            search: "search"
        }
    });

    const { data, isLoading, error } = useQuery<{ articles: IExtendedArticle[]; totalPages: number; }>({
        queryKey: ['home-articles', page, limit, search],
        queryFn: async () => await fetchData(+page!, limit, search!),
        retry: 1,
        refetchInterval: 1000 * 60,
        staleTime: 1000 * 2,
    });

    useEffect(() => {
        setUserId(localStorage.getItem('userId') || undefined);
    }, []);

    const handlePageChange = (newPage: number) => {
        setParams({ page: newPage });
    };

    if (isLoading) {
        return <ArticleListSkeleton isPagination={true} itemCount={limit} />;
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

                            <PaginationItems
                                totalPages={data.totalPages}
                                currentPage={page}
                                onPageChange={handlePageChange}
                            />

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
