'use client';

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { memo, useCallback } from "react";
import UserProfile from '@/components/common/UserProfile';
import { useRouter } from "next/navigation";
import { IUser } from "@/types/entities";

const ProfileModel = ({ user }: { user: IUser; }) => {
    const router = useRouter();
    const handleOpenChange = useCallback(() => {
        router.back();
    }, [router]);


    return (
        <Dialog open onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogTitle>User Profile</DialogTitle>
                <UserProfile user={user} />
            </DialogContent>
        </Dialog>
    );

};

export default memo(ProfileModel);