import PaginatedList from "@/components/common/PaginatedList";
import { HomePageProps } from "@/types/props";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { cookies } from "next/headers";
import { fetchData } from "../lib/fetch/fetchArticles";


export default async function HomePage({ searchParams }: HomePageProps) {
  const page = Math.max(1, +((await searchParams).page || "1"));
  const token = (await cookies()).get("token");
  const limit = 6;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["home-articles", page, limit],
    queryFn: async () => await fetchData(page, limit, token?.value!),
    retry: 1
  });


  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center mb-4">Readify</h1>
        <p className="text-center text-muted-foreground mb-6">
          Discover, read, and manage your favorite articles
        </p>
      </header>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <PaginatedList
          page={page}
          limit={limit}
        />
      </HydrationBoundary>

      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Readify. All rights reserved.</p>
      </footer>
    </div>
  );
};

