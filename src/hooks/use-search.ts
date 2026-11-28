"use client";

import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { searchAction } from "@/actions/search.actions";
import type { SearchData } from "@/types/search.types";

function useDebounce<T>(value: T, delay = 350): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export function useSearch() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 350);

  const { data, isLoading, isError, error, isFetching } = useQuery<SearchData>({
    queryKey: ["navbar-search", debouncedQuery],
    queryFn: () => searchAction(debouncedQuery),
    enabled: debouncedQuery.trim().length > 0,
    staleTime: 1000 * 30, // 30 seconds
    retry: 1,
  });

  const hasSearch = query.trim().length > 0;
  const isSearching = (isLoading || isFetching) && debouncedQuery.trim().length > 0;

  return {
    query,
    setQuery,
    data: hasSearch ? data ?? null : null,
    total: data?.total ?? 0,
    isLoading: isSearching,
    isError: Boolean(isError && hasSearch),
    errorMessage: error instanceof Error ? error.message : null,
    isOpen: hasSearch,
    clearSearch: () => setQuery(""),
  };
}
