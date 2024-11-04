'use client';
import React from 'react';
import ArticleList from './ArticleList';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious,
  PaginationEllipsis, 
} from '../ui/pagination';
import { useRouter } from 'next/navigation';
import { PaginatedListProps } from '@/types/props';

const PaginatedList = ({ articles, userId, page, totalPages }: PaginatedListProps) => {
    const router = useRouter();

    const handlePageChange = (newPage: number) => {
        router.push(`/?page=${newPage}`);
    };

    const renderPaginationItems = () => {
        const items = [];
        const showEllipsisStart = page > 3;
        const showEllipsisEnd = page < totalPages - 2;

        items.push(
            <PaginationItem key={1}>
                <PaginationLink
                    onClick={() => handlePageChange(1)}
                    isActive={1 === page}
                >
                    1
                </PaginationLink>
            </PaginationItem>
        );

        if (showEllipsisStart) {
            items.push(
                <PaginationItem key="ellipsis-start">
                    <PaginationEllipsis />
                </PaginationItem>
            );
        }

        for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
            items.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        onClick={() => handlePageChange(i)}
                        isActive={i === page}
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        if (showEllipsisEnd) {
            items.push(
                <PaginationItem key="ellipsis-end">
                    <PaginationEllipsis />
                </PaginationItem>
            );
        }

        if (totalPages > 1) {
            items.push(
                <PaginationItem key={totalPages}>
                    <PaginationLink
                        onClick={() => handlePageChange(totalPages)}
                        isActive={totalPages === page}
                    >
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        return items;
    };

    return (
        <div>
            <ArticleList articles={articles} isHome userId={userId} />
            
            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-8">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => handlePageChange(page - 1)}
                                    className={page <= 1 ? 'pointer-events-none opacity-50' : ''}
                                />
                            </PaginationItem>

                            {renderPaginationItems()}

                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => handlePageChange(page + 1)}
                                    className={page >= totalPages ? 'pointer-events-none opacity-50' : ''}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    );
};

export default PaginatedList;