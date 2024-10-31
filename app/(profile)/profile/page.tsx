import ProfileSkeleton from "@/components/skeleton/ProfileSkeleton";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UserProfile = dynamic(() => import('@/components/common/UserProfile'), {
    loading: () => <ProfileSkeleton />
});


export default async function ProfilePage() {

    return (
        <div className="container mx-auto py-10">
            <Card className="w-full max-w-2xl mx-auto p">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">User Profile</CardTitle>
                </CardHeader>
                <CardContent>
                    <UserProfile />
                </CardContent>
            </Card>
        </div >
    );
}
