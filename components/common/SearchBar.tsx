'use client';

import { ChangeEvent, FormEvent, useCallback } from 'react';
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useDebouncedCallback } from 'use-debounce';

export default function SearchBar() {
  const [{ search }, setSearch] = useQueryStates({

    page: parseAsInteger.withDefault(1),
    search: parseAsString.withDefault("")
}, {
    urlKeys: {
        page: "page",
        search: "search"
    }
});

  const debouncedSetSearch = useDebouncedCallback(
    (value: string) => {
      setSearch({search:value, page:1});
    },
    500
  );

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const searchValue = formData.get('search') as string;
    setSearch({search:searchValue, page:1});
  }, [setSearch]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    debouncedSetSearch(e.target.value);
  }, [debouncedSetSearch]);

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm items-center space-x-2">
      <Input
        name="search"
        type="text"
        placeholder="Search articles..."
        defaultValue={search}
        onChange={handleChange}
        className="flex-grow"
        autoComplete="off"
      />
      <Button
        type="submit"
        variant="default"
        className="min-w-[100px] justify-center"
      >
        <Search className="mr-2 h-4 w-4" />
        Search
      </Button>
    </form>
  );
}