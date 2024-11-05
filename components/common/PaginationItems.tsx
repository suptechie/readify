import React from 'react';
import {
    PaginationItem,
    PaginationLink,
    PaginationEllipsis,
} from '../ui/pagination';

type PaginationItemsProps = {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
};

const PaginationItems = ({ totalPages, currentPage, onPageChange }: PaginationItemsProps) => {
    const items = [];
    const showEllipsisStart = currentPage > 3;
    const showEllipsisEnd = currentPage < totalPages - 2;

    items.push(
        <PaginationItem key={1}>
            <PaginationLink
                onClick={() => onPageChange(1)}
                isActive={1 === currentPage}
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

    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        items.push(
            <PaginationItem key={i}>
                <PaginationLink
                    onClick={() => onPageChange(i)}
                    isActive={i === currentPage}
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
                    onClick={() => onPageChange(totalPages)}
                    isActive={totalPages === currentPage}
                >
                    {totalPages}
                </PaginationLink>
            </PaginationItem>
        );
    }

    return <>{items}</>;
};

export default PaginationItems;
