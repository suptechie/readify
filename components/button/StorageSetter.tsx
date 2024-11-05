'use client'
import  { memo, useEffect } from 'react';

const StorageSetter = ({ token, userId }: { token: string; userId: string; }) => {
    useEffect(() => {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
    }, []);
    return (
        <div />
    );
};

export default memo(StorageSetter);