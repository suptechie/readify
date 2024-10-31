import ProfileModel from '@/components/models/ProfileModel';
import { fetchWithToken } from '@/lib/fetch/fetchWithToken';
import React from 'react';

const page = async () => {
    try {
        const response = await fetchWithToken('/api/user');

        if (!response.ok) {
            const errorData = await response.json();
            return <div>Err or: {errorData.error}</div>;
        }

        const { user } = await response.json();

        if (!user) {
            return <div>No user found</div>;
        }

   
        return <ProfileModel userId={user.id} />;
    } catch (error) {
        return <div>Error: {error instanceof Error ? error.message : 'Something went wrong'}</div>;
    }
};

export default page;