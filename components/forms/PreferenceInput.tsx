'use client';

import { useState, useEffect, memo } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { IUser, Genres } from '@/types/entities';
import { NEXT_PUBLIC_API_URL } from '@/config';
import { MultiSelect } from '@/components/ui/multi-select';
import { GENRES } from '@/constants';

const PreferenceInput = ()=> {
    const [user, setUser] = useState<IUser | null>(null);
    const [preferences, setPreferences] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/user`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const userData: IUser = (await response.json()).user;
                setUser(userData);                
                setPreferences(userData.preferences?.map(pref => pref.toString()) || []);
            } catch (error) {
                console.error('Error fetching user:', error);
                toast({
                    title: "Error",
                    description: "Failed to load user preferences",
                    variant: "destructive",
                });
            } finally {
                setIsLoading(false);
            }
        };
        fetchUser();
    }, []);

    const handlePreferenceChange = (value: string[]) => {
        setPreferences(value);
    };

    const savePreferences = async () => {
        if (!user) return;

        setIsSaving(true);
        try {
            const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/user`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(preferences.map(pref => pref as Genres)),
            });
            
            if (!response.ok) {
                throw new Error('Failed to update preferences');
            }

            toast({
                title: "Success",
                description: "Your preferences have been updated",
            });
        } catch (error) {
            console.error('Error Updating Preference:', error);
            toast({
                title: "Error",
                description: "Failed to save preferences",
                variant: "destructive",
            });
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return <div className="text-center">Loading preferences...</div>;
    }

    if (!user) {
        return <div className="text-center">No user data available</div>;
    }

    return (
        <div className="flex">
            <div className="grid grid-cols-1 gap-2 w-full">
                <MultiSelect
                    options={GENRES.map(genre => ({ label: genre.label, value: genre.id }))}
                    onValueChange={handlePreferenceChange}
                    defaultValue={preferences}
                    placeholder="Select your favorite genres"
                    maxCount={1}
                    className="w-full"
                />
            </div>
            <Button size={'sm'} onClick={savePreferences} className='m-1 py-5 text-base' disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save'}
            </Button>
        </div>
    );
}

export default memo(PreferenceInput);