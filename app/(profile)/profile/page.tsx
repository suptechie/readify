import ProfileSkeleton from "@/components/skeleton/ProfileSkeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NEXT_PUBLIC_API_URL } from "@/config";
import impDynamic from "next/dynamic";  
import { headers } from "next/headers";

const UserProfile = impDynamic(() => import('@/components/common/UserProfile'), {
    loading: () => <ProfileSkeleton />
});

export const dynamic = 'force-dynamic';

const Page = async () => {
    try {
        const headersList = await headers();
        const token = headersList.get('authorization')?.replace('Bearer ', '');

        const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/user`, {
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
            },
            cache: 'no-store'
        });

        if (!response.ok) {
            const errorData = await response.json();
            return <div>Error: {errorData.error}</div>;
        }

        const data = await response.json();        

        if (!data.user) {
            return <div>No user found</div>;
        }

        return (
            <div className="container mx-auto py-10">
                <Card className="w-full max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center">User Profile</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <UserProfile user={data.user} />
                    </CardContent>
                </Card>
            </div>
        );
    } catch (error) {
        return <div>Error: {error instanceof Error ? error.message : 'Something went wrong'}</div>;
    }
};

export default Page;
