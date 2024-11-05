import PaginatedList from "@/components/common/PaginatedList";
import SearchBar from "@/components/common/SearchBar";

export const experimental_ppr = true;

export default async function HomePage() {

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center mb-4">Readify</h1>
        <p className="text-center text-muted-foreground mb-6">
          Discover, read, and manage your favorite articles
        </p>
      </header>

      <div className="flex justify-center items-center mb-6">
        <SearchBar />
      </div>

      <PaginatedList />

      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Readify. All rights reserved.</p>
      </footer>
    </div>
  );
};

