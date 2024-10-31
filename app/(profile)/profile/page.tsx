import ProfileSkeleton from "@/components/skeleton/ProfileSkeleton";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchWithToken } from "@/lib/fetch/fetchWithToken";


const UserProfile = dynamic(() => import('@/components/common/UserProfile'), {
    loading: () => <ProfileSkeleton />
});


const page = async () => {
    try {
        const response = await fetchWithToken(`/api/user`);

        if (!response.ok) {
            const errorData = await response.json();
            return <div>Err or: {errorData.error}</div>;
        }

        const { user } = await response.json();

        if (!user) {
            return <div>No user found</div>;
        }

        return (
            <div className="container mx-auto py-10">
                <Card className="w-full max-w-2xl mx-auto p">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center">User Profile</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <UserProfile user={user} />
                    </CardContent>
                </Card>
            </div >
        );
    } catch (error) {
        return <div>Error: {error instanceof Error ? error.message : 'Something went wrong'}</div>;
    }
};

export default page;














// export default async function ProfilePage() {


// }











